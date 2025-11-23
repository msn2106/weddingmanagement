import { createApp } from './app';
import { initializeDatabase } from './config/database';
import { config } from './config/environment';

let port: string = config.port || '5000';
const startServer = async (port: string) => {
  try {
    // Initialize database
    await initializeDatabase();

    // Create and start app
    const app = createApp();
    const server = app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📍 Environment: ${config.nodeEnv}`);
      console.log(`🌐 Frontend URL: ${config.frontendUrl}`);
    });
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${port} in use, trying ${Number(port) + 1}...`);
        startServer(String(Number(port) + 1));
      } else {
        throw err;
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(port);
