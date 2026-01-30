import React, { useState, useEffect, useCallback } from 'react';
import { TextField } from './fields/TextField';
import { TextAreaField } from './fields/TextAreaField';
import { HtmlField } from './fields/HtmlField';
import { ReadOnlyField } from './fields/ReadOnlyField';
import { startRender, startRenderSingle, getRenderStatus, type RenderStatus } from '../api/dataApi';
import type { CompositionProps } from '@project/CompositionSchema';

interface FormPanelProps {
  data: CompositionProps;
  onUpdate: <K extends keyof CompositionProps>(field: K, value: CompositionProps[K]) => void;
  onSave: () => void;
  isSaving: boolean;
  isSyncing: boolean;
  hasChanges: boolean;
  selectedComposition: string;
}

export const FormPanel: React.FC<FormPanelProps> = ({
  data,
  onUpdate,
  onSave,
  isSaving,
  isSyncing,
  hasChanges,
  selectedComposition,
}) => {
  const [renderStatus, setRenderStatus] = useState<RenderStatus | null>(null);
  const [showRenderOutput, setShowRenderOutput] = useState(false);
  const [showAssets, setShowAssets] = useState(false);

  const pollRenderStatus = useCallback(async () => {
    try {
      const status = await getRenderStatus();
      setRenderStatus(status);
      return status.isRendering;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (renderStatus?.isRendering) {
      const interval = setInterval(async () => {
        const stillRendering = await pollRenderStatus();
        if (!stillRendering) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [renderStatus?.isRendering, pollRenderStatus]);

  const handleRenderAll = async () => {
    try {
      await startRender();
      setShowRenderOutput(true);
      pollRenderStatus();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to start render');
    }
  };

  const handleRenderCurrent = async () => {
    try {
      await startRenderSingle(selectedComposition);
      setShowRenderOutput(true);
      pollRenderStatus();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to start render');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>DFK Content Editor</h2>
        <button
          onClick={onSave}
          disabled={isSaving || isSyncing || !hasChanges}
          style={{
            ...styles.saveButton,
            ...(isSaving || isSyncing || !hasChanges ? styles.saveButtonDisabled : {}),
          }}
        >
          {isSaving ? 'Saving...' : isSyncing ? 'Syncing...' : hasChanges ? 'Save Changes' : 'Synced'}
        </button>
      </div>

      <div style={styles.form}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Text Content</h3>

          <TextField
            label="Title"
            value={data.title}
            onChange={(value) => onUpdate('title', value)}
            placeholder="Enter title..."
          />

          <TextField
            label="Subtitle"
            value={data.subtitle}
            onChange={(value) => onUpdate('subtitle', value)}
            placeholder="Enter subtitle..."
          />

          <HtmlField
            label="Offer Text (HTML)"
            value={data.offerText}
            onChange={(value) => onUpdate('offerText', value)}
            placeholder="Enter offer text with HTML..."
          />

          <TextAreaField
            label="Disclaimer"
            value={data.disclaimer}
            onChange={(value) => onUpdate('disclaimer', value)}
            placeholder="Enter disclaimer text..."
            rows={8}
          />
        </div>

        <div style={styles.section}>
          <div
            style={styles.sectionHeader}
            onClick={() => setShowAssets(!showAssets)}
          >
            <h3 style={styles.sectionTitle}>Assets (Read-only)</h3>
            <span style={styles.toggleIcon}>{showAssets ? '▼' : '▶'}</span>
          </div>

          {showAssets && (
            <div style={styles.assetsContent}>
              <ReadOnlyField label="Logo" value={data.logoSrc} />
              <ReadOnlyField label="Video (Landscape)" value={data.videoSrcLandscape} />
              <ReadOnlyField label="Video (Portrait)" value={data.videoSrcPortrait} />
              <ReadOnlyField label="Offer Image" value={data.offerImage} />
              {data.overlaySrc && (
                <ReadOnlyField label="Overlay" value={data.overlaySrc} />
              )}
              {data.subtitleIcon && (
                <ReadOnlyField label="Subtitle Icon" value={data.subtitleIcon} />
              )}
            </div>
          )}
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Render</h3>

          <div style={styles.renderButtons}>
            <button
              onClick={handleRenderCurrent}
              disabled={renderStatus?.isRendering || hasChanges}
              style={{
                ...styles.renderButton,
                ...(renderStatus?.isRendering || hasChanges ? styles.renderButtonDisabled : {}),
              }}
            >
              {renderStatus?.isRendering ? 'Rendering...' : `Render ${selectedComposition}`}
            </button>

            <button
              onClick={handleRenderAll}
              disabled={renderStatus?.isRendering || hasChanges}
              style={{
                ...styles.renderButton,
                ...(renderStatus?.isRendering || hasChanges ? styles.renderButtonDisabled : {}),
              }}
            >
              {renderStatus?.isRendering ? 'Rendering...' : 'Render All'}
            </button>
          </div>

          {hasChanges && (
            <p style={styles.renderHint}>Save changes before rendering</p>
          )}

          {renderStatus && (
            <div style={styles.renderStatus}>
              <div
                style={styles.renderStatusHeader}
                onClick={() => setShowRenderOutput(!showRenderOutput)}
              >
                <span>
                  {renderStatus.isRendering ? '⏳ Rendering...' :
                   renderStatus.error ? '❌ Render failed' :
                   renderStatus.output.length > 0 ? '✅ Render complete' : ''}
                </span>
                <span style={styles.toggleIcon}>{showRenderOutput ? '▼' : '▶'}</span>
              </div>

              {showRenderOutput && renderStatus.output.length > 0 && (
                <div style={styles.renderOutput}>
                  {renderStatus.output.slice(-20).map((line, i) => (
                    <div key={i} style={styles.renderLine}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#1e1e1e',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #333',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
  },
  saveButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#0066ff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  saveButtonDisabled: {
    backgroundColor: '#444',
    cursor: 'not-allowed',
  },
  form: {
    flex: 1,
    overflow: 'auto',
    padding: '20px',
  },
  section: {
    marginBottom: '24px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '12px',
  },
  sectionTitle: {
    margin: '0 0 16px 0',
    fontSize: '16px',
    fontWeight: 600,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  toggleIcon: {
    fontSize: '10px',
    color: '#888',
  },
  assetsContent: {
    marginTop: '12px',
  },
  renderButtons: {
    display: 'flex',
    gap: '10px',
  },
  renderButton: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#fff',
    color: '#000',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  renderButtonDisabled: {
    backgroundColor: '#444',
    cursor: 'not-allowed',
  },
  renderHint: {
    margin: '8px 0 0 0',
    fontSize: '12px',
    color: '#f59e0b',
  },
  renderStatus: {
    marginTop: '12px',
    border: '1px solid #333',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  renderStatusHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    backgroundColor: '#2a2a2a',
    cursor: 'pointer',
    fontSize: '13px',
  },
  renderOutput: {
    maxHeight: '200px',
    overflow: 'auto',
    padding: '8px 12px',
    backgroundColor: '#1a1a1a',
    fontSize: '11px',
    fontFamily: 'monospace',
  },
  renderLine: {
    padding: '2px 0',
    color: '#aaa',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
};
