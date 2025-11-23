import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config/environment';
import routes from './routes';

export const createApp = (): Application => {
    const app = express();

    // Middleware
    app.use(cors({
        origin: config.frontendUrl,
        credentials: true,
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Health check
    app.get('/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // API Routes
    app.use('/api', routes);

    // 404 Handler
    app.use((req, res) => {
        res.status(404).json({ success: false, error: 'Route not found' });
    });

    // Error Handler
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error('Error:', err);
        res.status(err.status || 500).json({
            success: false,
            error: err.message || 'Internal server error',
        });
    });

    return app;
};