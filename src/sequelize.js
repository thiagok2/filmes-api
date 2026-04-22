import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create a Sequelize instance based on DATABASE_URL.
// In test environment default to sqlite in-memory for fast, isolated tests.
let connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  if (process.env.NODE_ENV === 'test') {
    connectionString = 'sqlite::memory:';
  } else {
    connectionString = 'postgres://postgres:postgres@localhost:5432/filmes';
  }
}

const sequelize = new Sequelize(connectionString, {
  dialect: connectionString.startsWith('sqlite') ? 'sqlite' : 'postgres',
  logging: false
});

// Debug: print which connection string/dialect is being used
// Debug log removed in favor of quieter test output

export default sequelize;
