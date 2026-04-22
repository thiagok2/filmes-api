import express from 'express';
import { Filme, Comentario } from '../models/index.js';

const router = express.Router();

// GET /api/filmes - list all filmes (optionally include counts)
router.get('/', async (req, res) => {
  try {
    const filmes = await Filme.findAll({
      attributes: ['id', 'titulo', 'data_lancamento', 'tipo', 'nota_avaliacao']
    });
    res.json(filmes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

// GET /api/filmes/:id - get film with its comments and curtidas (profiles who liked)
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const filme = await Filme.findByPk(id, {
      include: [
        { model: Comentario, as: 'comentarios' },
        // include profiles that liked the film via the many-to-many association
        { association: 'recebeu_curtidas', through: { attributes: ['data_curtida'] } }
      ]
    });
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
    res.json(filme);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar filme' });
  }
});

// POST /api/filmes - create
router.post('/', async (req, res) => {
  try {
    const data = req.body || {};
    const novo = await Filme.create(data);
    res.status(201).json(novo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar filme' });
  }
});

// PUT /api/filmes/:id - update
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const filme = await Filme.findByPk(id);
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
    await filme.update(req.body || {});
    res.json(filme);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar filme' });
  }
});

// DELETE /api/filmes/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const filme = await Filme.findByPk(id);
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });
    await filme.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar filme' });
  }
});

export default router;
