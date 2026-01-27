import React, { useState } from 'react';
import { FormPanel } from './components/FormPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { useCompositionData } from './hooks/useCompositionData';

export const App: React.FC = () => {
  const {
    data,
    compositions,
    isLoading,
    isSaving,
    isSyncing,
    error,
    updateField,
    save,
    hasChanges,
  } = useCompositionData();

  const [selectedComposition, setSelectedComposition] = useState('Landscape');

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2 style={styles.errorTitle}>Error</h2>
        <p style={styles.errorText}>{error}</p>
        <p style={styles.errorHint}>
          Make sure the API server is running on port 3001.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>No data available</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.formPanel}>
        <FormPanel
          data={data}
          onUpdate={updateField}
          onSave={save}
          isSaving={isSaving}
          isSyncing={isSyncing}
          hasChanges={hasChanges}
          selectedComposition={selectedComposition}
        />
      </div>
      <div style={styles.previewPanel}>
        <PreviewPanel
          compositions={compositions}
          selectedComposition={selectedComposition}
          onCompositionChange={setSelectedComposition}
        />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  formPanel: {
    width: '400px',
    minWidth: '350px',
    borderRight: '1px solid #333',
    overflow: 'hidden',
  },
  previewPanel: {
    flex: 1,
    overflow: 'hidden',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#1a1a1a',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #333',
    borderTopColor: '#0066ff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    color: '#888',
    fontSize: '14px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#1a1a1a',
    padding: '20px',
  },
  errorTitle: {
    color: '#ff4444',
    marginBottom: '8px',
  },
  errorText: {
    color: '#fff',
    fontSize: '16px',
    textAlign: 'center',
  },
  errorHint: {
    color: '#888',
    fontSize: '14px',
    marginTop: '16px',
  },
};
