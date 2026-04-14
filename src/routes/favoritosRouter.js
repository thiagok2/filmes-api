import express from 'express';

const router = express.Router();

let favoritos = [
  { id: 1, user: 'thiago', filmeId: 1 }
];
let nextId = favoritos.length + 1;

// GET all
router.get('/', (req, res) => {
  res.json(favoritos);
});

// GET by id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = favoritos.find(f => f.id === id);
  if (!item) return res.status(404).json({ error: 'Favorito não encontrado' });
  res.json(item);
});

// POST
router.post('/', (req, res) => {
  const body = req.body || {};
  const newItem = { id: nextId++, ...body };
  favoritos.push(newItem);
  res.status(201).json(newItem);
});

// PUT
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = favoritos.findIndex(f => f.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Favorito não encontrado' });
  favoritos[idx] = { id, ...req.body };
  res.json(favoritos[idx]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = favoritos.findIndex(f => f.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Favorito não encontrado' });
  const removed = favoritos.splice(idx, 1)[0];
  res.json(removed);
});

export default router;
