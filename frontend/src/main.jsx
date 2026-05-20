import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { StorageProvider } from './context/storageProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StorageProvider>
            <App/>
        </StorageProvider>
    </React.StrictMode>
);