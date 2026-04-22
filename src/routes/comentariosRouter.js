import express from 'express';
import { Comentario, Filme, Perfil } from '../models/index.js';

const router = express.Router();

// GET all comments
router.get('/', async (req, res) => {
  try {
    const list = await Comentario.findAll({ include: [{ model: Filme, as: 'filme' }, { model: Perfil, as: 'perfil' }] });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar comentários' });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await Comentario.findByPk(id, { include: [{ model: Filme, as: 'filme' }, { model: Perfil, as: 'perfil' }] });
    if (!item) return res.status(404).json({ error: 'Comentário não encontrado' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar comentário' });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const data = req.body || {};
    const created = await Comentario.create(data);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar comentário' });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await Comentario.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Comentário não encontrado' });
    await item.update(req.body || {});
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar comentário' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const item = await Comentario.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Comentário não encontrado' });
    await item.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar comentário' });
  }
});

export default router;
