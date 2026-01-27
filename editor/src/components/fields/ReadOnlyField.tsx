import React from 'react';

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

export const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({
  label,
  value,
}) => {
  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <div style={styles.value}>{value}</div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    marginBottom: '12px',
  },
  label: {
    display: 'block',
    marginBottom: '4px',
    fontSize: '12px',
    fontWeight: 500,
    color: '#888',
  },
  value: {
    padding: '8px 10px',
    fontSize: '13px',
    border: '1px solid #333',
    borderRadius: '4px',
    backgroundColor: '#1e1e1e',
    color: '#999',
    fontFamily: 'monospace',
  },
};
