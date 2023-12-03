import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import circleDependency from 'vite-plugin-circular-dependency';

export default defineConfig({
    plugins: [
        react(),
        svgr(),
        // ! че не работает
        circleDependency({
            exclude: '/node_modules/',
            circleImportThrowErr: true,
        }),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: '/src' },
            { find: 'app', replacement: '/src/app' },
            { find: 'entities', replacement: '/src/entities' },
            { find: 'features', replacement: '/src/features' },
            { find: 'pages', replacement: '/src/pages' },
            { find: 'shared', replacement: '/src/shared' },
            { find: 'widgets', replacement: '/src/widgets' },
        ],
    },
});
