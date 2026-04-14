import express from 'express';

const router = express.Router();

let filmes = [
  { id: 1, titulo: 'Desligue!', pais: 'Coréia do Sul', produtora: { nome: 'universal' } },
  { id: 2, titulo: 'Outro Filme', pais: 'Brasil', produtora: { nome: 'indie' } }
];
let nextId = filmes.length + 1;

// GET /api/filmes - all
router.get('/', (req, res) => {
  res.json(filmes);
});

// GET /api/filmes/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = filmes.find(f => f.id === id);
  if (!item) return res.status(404).json({ error: 'Filme não encontrado' });
  res.json(item);
});

// POST /api/filmes
router.post('/', (req, res) => {
  const body = req.body || {};

  const newItem = { id: nextId++, ...body };

  filmes.push(newItem);
  res.status(201).json(newItem);
});

// PUT /api/filmes/:id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = filmes.findIndex(f => f.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Filme não encontrado' });
  filmes[idx] = { id, ...filmes[idx], ...req.body };

  console.log(filmes[idx]);
  res.json(filmes[idx]);
});

// DELETE /api/filmes/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = filmes.findIndex(f => f.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Filme não encontrado' });
  const removed = filmes.splice(idx, 1)[0];
  res.json(removed);
});

export default router;
