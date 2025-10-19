// src/views/Login.spec.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppStateContext } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom'; // Importamos BrowserRouter normal
import Login from './Login';

// --- VOLVEMOS a usar jest.mock SÓLO para useNavigate ---
// Esta es la forma correcta en este entorno
const mockNavigate = jasmine.createSpy('navigate'); // <-- Spy de Jasmine
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantenemos el resto del módulo real
  useNavigate: () => mockNavigate, // Sobrescribimos useNavigate para que devuelva nuestro spy
}));
// --------------------------------------------------------

describe('Login Component (Jasmine/RTL)', () => {
  let mockLoginSpy;
  let mockContextValue;

  beforeEach(() => {
    // Limpiar spies antes de cada prueba
    mockLoginSpy = jasmine.createSpy('login');
    mockNavigate.calls.reset(); 

    mockContextValue = {
      login: mockLoginSpy,
      products: [], cartItems: [], currentUser: null, theme: 'light',
    };

    render(
      // Usamos BrowserRouter real porque ya no mockeamos todo react-router-dom
      <BrowserRouter>
        <AppStateContext.Provider value={mockContextValue}>
          <Login />
        </AppStateContext.Provider>
      </BrowserRouter>
    );
  });

  // --- Pruebas de Estado (Sin cambios) ---
  it('debería actualizar el estado (valor) del input de email al escribir', () => {
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@usuario.com' } });
    expect(emailInput.value).toBe('test@usuario.com');
  });

  it('debería actualizar el estado (valor) del input de contraseña al escribir', () => {
    const passwordInput = screen.getByLabelText(/contraseña/i);
    fireEvent.change(passwordInput, { target: { value: 'pass123' } });
    expect(passwordInput.value).toBe('pass123');
  });

  // --- Pruebas de Renderizado Condicional (Sin cambios) ---
  it('NO debería mostrar un mensaje de error al cargar la página', () => {
    const errorAlert = screen.queryByRole('alert');
    expect(errorAlert).not.toBeInTheDocument();
  });

  it('SÍ debería mostrar un mensaje de error si el login falla (devuelve null)', () => {
    mockLoginSpy.and.returnValue(null);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@usuario.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'pass123' } });
    const loginButton = screen.getByRole('button', { name: /ingresar/i });
    fireEvent.click(loginButton);
    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent(/Credenciales incorrectas/i);
  });

  // --- Prueba de Navegación (Usa mockNavigate) ---
  it('NO debería mostrar mensaje de error y SÍ navegar si el login es exitoso', () => {
    const mockUser = { name: 'Test', role: 'cliente' };
    mockLoginSpy.and.returnValue(mockUser);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@usuario.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'pass123' } });
    const loginButton = screen.getByRole('button', { name: /ingresar/i });
    fireEvent.click(loginButton);
    const errorAlert = screen.queryByRole('alert');
    expect(errorAlert).not.toBeInTheDocument();

    // Verificar que el spy de Jasmine (mockNavigate) fue llamado
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});