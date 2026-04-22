import express from 'express';
import { Usuario, Perfil } from '../models/index.js';

const router = express.Router();

// GET all usuarios
router.get('/', async (req, res) => {
  try {
    const users = await Usuario.findAll({ attributes: ['id', 'uid', 'email', 'nome_completo', 'data_registro'] });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// GET usuario by id with perfis
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = await Usuario.findByPk(id, { include: [{ model: Perfil, as: 'perfis' }] });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// POST create usuario (validation: uid required)
router.post('/', async (req, res) => {
  try {
    const { uid, email, nome_completo } = req.body || {};
    if (!uid) return res.status(400).json({ error: 'uid é obrigatório' });
    const created = await Usuario.create({ uid, email, nome_completo });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = await Usuario.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    await user.update(req.body || {});
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = await Usuario.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    await user.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

export default router;
