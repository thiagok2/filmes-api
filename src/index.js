import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();
import filmesRouter from './routes/filmesRouter.js';
import favoritosRouter from './routes/favoritosRouter.js';
import comentariosRouter from './routes/comentariosRouter.js';

const app = express();
const port = process.env.PORT;

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

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	logging: false
});

async function init() {
	try {
		await sequelize.authenticate();
		console.log('Conexão com Postgres estabelecida com sucesso.');

		app.listen(port, () => {
			console.log(`Servidor ouvindo na porta ${port}`);
		});
	} catch (err) {
		console.error('Não foi possível conectar ao banco de dados:', err);
		process.exit(1);
	}
}

// Inicia tudo
init();

export { sequelize };