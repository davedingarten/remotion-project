import React from 'react';
import type { CompositionConfig } from '../api/dataApi';

interface PreviewPanelProps {
  compositions: CompositionConfig[];
  selectedComposition: string;
  onCompositionChange: (id: string) => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  compositions,
  selectedComposition,
  onCompositionChange,
}) => {
  const composition = compositions.find(c => c.id === selectedComposition) || compositions[0];

  // Build the Remotion Studio URL with the selected composition
  const studioUrl = `http://localhost:3002/${selectedComposition}`;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Preview (Remotion Studio)</h2>
        <select
          value={selectedComposition}
          onChange={(e) => onCompositionChange(e.target.value)}
          style={styles.select}
        >
          {compositions.map((comp) => (
            <option key={comp.id} value={comp.id}>
              {comp.id} ({comp.width}×{comp.height})
            </option>
          ))}
        </select>
      </div>

      <div style={styles.iframeContainer}>
        <iframe
          src={studioUrl}
          style={styles.iframe}
          title="Remotion Studio"
        />
      </div>

      {composition && (
        <div style={styles.info}>
          <span style={styles.infoItem}>
            {composition.width}×{composition.height}
          </span>
          <span style={styles.infoItem}>
            {composition.fps} fps
          </span>
          <span style={styles.infoItem}>
            {(composition.durationInFrames / composition.fps).toFixed(1)}s
          </span>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#111',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #333',
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
  },
  select: {
    padding: '6px 10px',
    fontSize: '13px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    border: '1px solid #444',
    borderRadius: '4px',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
  },
  iframeContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  info: {
    display: 'flex',
    gap: '16px',
    padding: '10px 16px',
    borderTop: '1px solid #333',
    backgroundColor: '#1a1a1a',
    flexShrink: 0,
  },
  infoItem: {
    fontSize: '12px',
    color: '#888',
  },
};
