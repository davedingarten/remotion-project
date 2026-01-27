import type { CompositionProps } from '@project/CompositionSchema';

const API_BASE = '/api';

export interface CompositionConfig {
  id: string;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  orientation: 'landscape' | 'portrait';
  customWidth?: number;
}

export async function fetchData(): Promise<CompositionProps> {
  const response = await fetch(`${API_BASE}/data`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export async function saveData(data: CompositionProps): Promise<void> {
  const response = await fetch(`${API_BASE}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to save data');
  }
}

export async function fetchCompositions(): Promise<CompositionConfig[]> {
  const response = await fetch(`${API_BASE}/compositions`);
  if (!response.ok) {
    throw new Error('Failed to fetch compositions');
  }
  return response.json();
}

export interface RenderStatus {
  isRendering: boolean;
  output: string[];
  error: string | null;
  startTime: number | null;
}

export async function startRender(): Promise<void> {
  const response = await fetch(`${API_BASE}/render`, {
    method: 'POST',
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to start render');
  }
}

export async function startRenderSingle(compositionId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/render/single`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ compositionId }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to start render');
  }
}

export async function getRenderStatus(): Promise<RenderStatus> {
  const response = await fetch(`${API_BASE}/render/status`);
  if (!response.ok) {
    throw new Error('Failed to get render status');
  }
  return response.json();
}
