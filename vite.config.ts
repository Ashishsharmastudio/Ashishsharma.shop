import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
<<<<<<< HEAD
import { defineConfig } from 'vite';
import app from './src/server/api';
=======
import {defineConfig} from 'vite';
import express from 'express';
import apiRouter from './src/server/api';
>>>>>>> origin/main

export default defineConfig(() => {
  return {
    plugins: [
<<<<<<< HEAD
      react(),
=======
      react(), 
>>>>>>> origin/main
      tailwindcss(),
      {
        name: 'express-api',
        configureServer(server) {
<<<<<<< HEAD
          server.middlewares.use(app);
        },
      },
=======
          const app = express();
          app.use(express.json());
          app.use('/api', apiRouter);
          server.middlewares.use(app);
        }
      }
>>>>>>> origin/main
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
<<<<<<< HEAD
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
=======
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
>>>>>>> origin/main
