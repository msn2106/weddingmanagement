import { DataSource } from 'typeorm';
import { config } from './environment';
import { Guest } from '../entities/Guest';
import { Event } from '../entities/Event';
import { Budget } from '../entities/Budget';
import { Expense } from '../entities/Expense';
import { User } from '../entities/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  url: config.database.url,
  entities: [Guest, Event, Budget, Expense, User],
  synchronize: config.nodeEnv === 'development',
  logging: config.nodeEnv === 'development',
  ssl: config.database.url ? { rejectUnauthorized: true } : undefined,
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    if (AppDataSource && AppDataSource.isInitialized) {
      console.log('✅ Database connection already established');
      return;
    }
    await AppDataSource.initialize();
    console.log('✅ Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};
