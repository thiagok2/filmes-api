import express from 'express';
import { PlaylistFilme, Filme, Perfil } from '../models/index.js';

const router = express.Router();

// GET all favoritos (playlist entries)
router.get('/', async (req, res) => {
  try {
    const list = await PlaylistFilme.findAll({ include: [{ model: Filme }, { model: Perfil }] });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await PlaylistFilme.findByPk(id, { include: [Filme, Perfil] });
    if (!item) return res.status(404).json({ error: 'Favorito não encontrado' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar favorito' });
  }
});

// POST create favorito (playlist entry)
router.post('/', async (req, res) => {
  try {
    const data = req.body || {};
    const created = await PlaylistFilme.create(data);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar favorito' });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await PlaylistFilme.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Favorito não encontrado' });
    await item.update(req.body || {});
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar favorito' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await PlaylistFilme.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Favorito não encontrado' });
    await item.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar favorito' });
  }
});

export default router;
