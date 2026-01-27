import React, { useState } from 'react';

interface HtmlFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const HtmlField: React.FC<HtmlFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <label style={styles.label}>{label}</label>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          style={styles.toggleButton}
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        disabled={disabled}
        style={{
          ...styles.textarea,
          ...(disabled ? styles.disabled : {}),
        }}
      />
      {showPreview && (
        <div style={styles.preview}>
          <div style={styles.previewLabel}>Preview:</div>
          <div
            style={styles.previewContent}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    marginBottom: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#ccc',
  },
  toggleButton: {
    padding: '4px 8px',
    fontSize: '12px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    border: '1px solid #555',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#888',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #444',
    borderRadius: '6px',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'monospace',
    lineHeight: '1.5',
  },
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  preview: {
    marginTop: '8px',
    padding: '12px',
    border: '1px solid #444',
    borderRadius: '6px',
    backgroundColor: '#222',
  },
  previewLabel: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '8px',
  },
  previewContent: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#fff',
  },
};
