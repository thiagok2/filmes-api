import express from 'express';
import { Perfil, Usuario, PlaylistFilme, Curtida, Filme } from '../models/index.js';

const router = express.Router();

// GET all perfis
router.get('/', async (req, res) => {
  try {
    const list = await Perfil.findAll({ include: [{ model: Usuario, as: 'usuario' }] });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar perfis' });
  }
});

// GET perfil by id with usuario, playlist and curtidas
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const perfil = await Perfil.findByPk(id, {
      include: [
        { model: Usuario, as: 'usuario' },
        { model: PlaylistFilme, as: 'playlistRows', include: [Filme] },
        { model: Curtida, as: 'curtidaRows', include: [Filme] }
      ]
    });
    if (!perfil) return res.status(404).json({ error: 'Perfil não encontrado' });
    res.json(perfil);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

// POST create perfil (validation: usuario_id and nome required)
router.post('/', async (req, res) => {
  try {
    const { usuario_id, nome, imagem_path } = req.body || {};
    if (!usuario_id) return res.status(400).json({ error: 'usuario_id é obrigatório' });
    if (!nome) return res.status(400).json({ error: 'nome é obrigatório' });
    const created = await Perfil.create({ usuario_id, nome, imagem_path });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar perfil' });
  }
});

// PUT update perfil
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const perfil = await Perfil.findByPk(id);
    if (!perfil) return res.status(404).json({ error: 'Perfil não encontrado' });
    await perfil.update(req.body || {});
    res.json(perfil);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

// DELETE perfil
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const perfil = await Perfil.findByPk(id);
    if (!perfil) return res.status(404).json({ error: 'Perfil não encontrado' });
    await perfil.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar perfil' });
  }
});

export default router;
