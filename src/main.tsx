// src/main.test.tsx
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

describe('Main entry point', () => {
  test('renders App component', () => {
    // Crear un contenedor div para renderizar el componente
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);

    // Renderizar el componente App
    createRoot(container).render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    // Verificar que el componente App se ha renderizado correctamente
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });
});