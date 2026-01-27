import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Path to data.json in the main src directory
const DATA_FILE_PATH = path.resolve(__dirname, '../../src/data.json');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
}));

app.use(express.json());

// GET /api/data - Read data.json
app.get('/api/data', async (_req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading data.json:', error);
    res.status(500).json({ error: 'Failed to read data.json' });
  }
});

// POST /api/data - Write data.json
app.post('/api/data', async (req, res) => {
  try {
    const data = req.body;
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 4), 'utf-8');
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error writing data.json:', error);
    res.status(500).json({ error: 'Failed to write data.json' });
  }
});

// GET /api/compositions - Read compositions.json
app.get('/api/compositions', async (_req, res) => {
  try {
    const compositionsPath = path.resolve(__dirname, '../../src/compositions.json');
    const data = await fs.readFile(compositionsPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading compositions.json:', error);
    res.status(500).json({ error: 'Failed to read compositions.json' });
  }
});

// Render state
let renderStatus: {
  isRendering: boolean;
  output: string[];
  error: string | null;
  startTime: number | null;
} = {
  isRendering: false,
  output: [],
  error: null,
  startTime: null,
};

// POST /api/render/single - Render a single composition
app.post('/api/render/single', async (req, res) => {
  if (renderStatus.isRendering) {
    return res.status(409).json({ error: 'Render already in progress' });
  }

  const { compositionId } = req.body;
  if (!compositionId) {
    return res.status(400).json({ error: 'compositionId is required' });
  }

  renderStatus = {
    isRendering: true,
    output: [],
    error: null,
    startTime: Date.now(),
  };

  const projectRoot = path.resolve(__dirname, '../..');
  const outputPath = `out/${compositionId}.mp4`;

  const renderProcess = spawn('npx', ['remotion', 'render', compositionId, outputPath], {
    cwd: projectRoot,
    shell: true,
  });

  renderProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter((l: string) => l.trim());
    renderStatus.output.push(...lines);
    console.log('[render]', data.toString());
  });

  renderProcess.stderr.on('data', (data) => {
    const lines = data.toString().split('\n').filter((l: string) => l.trim());
    renderStatus.output.push(...lines);
    console.error('[render]', data.toString());
  });

  renderProcess.on('close', (code) => {
    renderStatus.isRendering = false;
    if (code !== 0) {
      renderStatus.error = `Render process exited with code ${code}`;
    }
    renderStatus.output.push(`Render completed with exit code ${code}`);
  });

  renderProcess.on('error', (err) => {
    renderStatus.isRendering = false;
    renderStatus.error = err.message;
  });

  res.json({ success: true, message: `Rendering ${compositionId}` });
});

// POST /api/render - Start rendering all compositions
app.post('/api/render', async (_req, res) => {
  if (renderStatus.isRendering) {
    return res.status(409).json({ error: 'Render already in progress' });
  }

  renderStatus = {
    isRendering: true,
    output: [],
    error: null,
    startTime: Date.now(),
  };

  const projectRoot = path.resolve(__dirname, '../..');

  const renderProcess = spawn('npm', ['run', 'render:all'], {
    cwd: projectRoot,
    shell: true,
  });

  renderProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter((l: string) => l.trim());
    renderStatus.output.push(...lines);
    console.log('[render]', data.toString());
  });

  renderProcess.stderr.on('data', (data) => {
    const lines = data.toString().split('\n').filter((l: string) => l.trim());
    renderStatus.output.push(...lines);
    console.error('[render]', data.toString());
  });

  renderProcess.on('close', (code) => {
    renderStatus.isRendering = false;
    if (code !== 0) {
      renderStatus.error = `Render process exited with code ${code}`;
    }
    renderStatus.output.push(`Render completed with exit code ${code}`);
  });

  renderProcess.on('error', (err) => {
    renderStatus.isRendering = false;
    renderStatus.error = err.message;
  });

  res.json({ success: true, message: 'Render started' });
});

// GET /api/render/status - Get render status
app.get('/api/render/status', (_req, res) => {
  res.json(renderStatus);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Data file path: ${DATA_FILE_PATH}`);
});
