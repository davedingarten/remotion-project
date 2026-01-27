import { useState, useEffect, useCallback } from 'react';
import { fetchData, saveData, fetchCompositions, type CompositionConfig } from '../api/dataApi';
import type { CompositionProps } from '@project/CompositionSchema';

interface UseCompositionDataReturn {
  data: CompositionProps | null;
  compositions: CompositionConfig[];
  isLoading: boolean;
  isSaving: boolean;
  isSyncing: boolean;
  error: string | null;
  updateField: <K extends keyof CompositionProps>(field: K, value: CompositionProps[K]) => void;
  save: () => Promise<void>;
  hasChanges: boolean;
}

export function useCompositionData(): UseCompositionDataReturn {
  const [data, setData] = useState<CompositionProps | null>(null);
  const [originalData, setOriginalData] = useState<CompositionProps | null>(null);
  const [compositions, setCompositions] = useState<CompositionConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [fetchedData, fetchedCompositions] = await Promise.all([
          fetchData(),
          fetchCompositions(),
        ]);
        setData(fetchedData);
        setOriginalData(fetchedData);
        setCompositions(fetchedCompositions);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const updateField = useCallback(<K extends keyof CompositionProps>(
    field: K,
    value: CompositionProps[K]
  ) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  }, []);

  const save = useCallback(async () => {
    if (!data) return;
    try {
      setIsSaving(true);
      await saveData(data);
      setOriginalData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [data]);

  const hasChanges = data !== null && originalData !== null &&
    JSON.stringify(data) !== JSON.stringify(originalData);

  // Debounced auto-save for live preview
  useEffect(() => {
    if (!hasChanges || !data) return;

    setIsSyncing(true);
    const timer = setTimeout(async () => {
      try {
        await saveData(data);
        setOriginalData(data);
      } catch (err) {
        console.error('Auto-save failed:', err);
      } finally {
        setIsSyncing(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [data, hasChanges]);

  return {
    data,
    compositions,
    isLoading,
    isSaving,
    isSyncing,
    error,
    updateField,
    save,
    hasChanges,
  };
}
