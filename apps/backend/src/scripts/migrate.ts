import 'reflect-metadata';
import { AppDataSource } from '../config/database';

const runMigrations = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');

    console.log('🔄 Running migrations...');
    await AppDataSource.synchronize();
    console.log('✅ Database schema synchronized');

    console.log('\n📊 Database Tables Created:');
    console.log('  - users');
    console.log('  - guests');
    console.log('  - events');
    console.log('  - budgets');
    console.log('  - expenses');
    console.log('  - guest_events (junction table)');

    console.log('\n🎉 Migration completed successfully!');
    console.log('💡 Next step: Run "npm run backend:seed" to add sample data\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

runMigrations();
