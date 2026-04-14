import express from 'express';

const router = express.Router();

let comentarios = [
  { id: 1, filmeId: 1, autor: 'Ana', texto: 'Ótimo filme!' }
];
let nextId = comentarios.length + 1;

// GET all
router.get('/', (req, res) => {
  res.json(comentarios);
});

// GET by id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = comentarios.find(c => c.id === id);
  if (!item) return res.status(404).json({ error: 'Comentário não encontrado' });
  res.json(item);
});

// POST
router.post('/', (req, res) => {
  const body = req.body || {};
  const newItem = { id: nextId++, ...body };
  comentarios.push(newItem);
  res.status(201).json(newItem);
});

// PUT
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = comentarios.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Comentário não encontrado' });
  comentarios[idx] = { id, ...req.body };
  res.json(comentarios[idx]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = comentarios.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Comentário não encontrado' });
  const removed = comentarios.splice(idx, 1)[0];
  res.json(removed);
});

export default router;
