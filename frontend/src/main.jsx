import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import './styles/layout.css';
import { StorageProvider } from './context/storageProvider.jsx';
import { ThemeProvider } from './context/themeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <StorageProvider>
                <App/>
            </StorageProvider>
        </ThemeProvider>
    </React.StrictMode>
);