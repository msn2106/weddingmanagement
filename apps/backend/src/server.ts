import { createApp } from './app';
import { initializeDatabase } from './config/database';
import { config } from './config/environment';

const startServer = async () => {
    try {
        // Initialize database
        await initializeDatabase();

        // Create and start app
        const app = createApp();
        const port = config.port;

        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
            console.log(`📍 Environment: ${config.nodeEnv}`);
            console.log(`🌐 Frontend URL: ${config.frontendUrl}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();