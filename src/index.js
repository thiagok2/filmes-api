import express from 'express';
import filmesRouter from './routes/filmesRouter.js';
import favoritosRouter from './routes/favoritosRouter.js';
import comentariosRouter from './routes/comentariosRouter.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ status: 'ok', message: 'API OK' });
});

app.use('/api/filmes', filmesRouter);
app.use('/api/favoritos', favoritosRouter);
app.use('/api/comentarios', comentariosRouter);

// 404
app.use((req, res) => {
	res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
	console.log(`Servidor ouvindo na porta ${port}`);
});