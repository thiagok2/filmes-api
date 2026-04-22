import express from 'express';
import { Filme, Comentario, Curtida } from '../models/index.js';

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
  // include curtida rows directly to expose data_curtida
  { model: Curtida, as: 'curtidaRows' },
        // also include profiles that liked the film (many-to-many)
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
    // basic validation
    if (!data.titulo) return res.status(400).json({ error: 'titulo é obrigatório' });
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
    // simple validation: if 'titulo' is provided it must not be empty after trimming
    if (Object.hasOwn(req.body ?? {}, 'titulo') && String(req.body?.titulo ?? '').trim() === '') {
      return res.status(400).json({ error: 'titulo não pode ser vazio' });
    }
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

// POST /api/filmes/:id/curtir - like a film (expects perfil_id in body)
router.post('/:id/curtir', async (req, res) => {
  const id = Number(req.params.id);
  const { perfil_id } = req.body || {};
  if (!perfil_id) return res.status(400).json({ error: 'perfil_id é obrigatório para curtir' });
  try {
    const filme = await Filme.findByPk(id);
    if (!filme) return res.status(404).json({ error: 'Filme não encontrado' });

    // prevent duplicate likes
  const existing = await Curtida.findOne({ where: { filme_id: id, perfil_id } });
    if (existing) return res.status(409).json({ error: 'Já curtido por este perfil' });

  const created = await Curtida.create({ data_curtida: new Date(), filme_id: id, perfil_id });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao curtir filme' });
  }
});

export default router;
