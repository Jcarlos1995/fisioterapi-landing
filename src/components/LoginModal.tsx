
import React from 'react';
import { LoginType } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LoginType;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className={`py-6 px-8 text-white ${type === LoginType.CLIENT ? 'bg-blue-600' : 'bg-slate-800'}`}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">
              {type === LoginType.CLIENT ? 'Portal Paciente' : 'Portal Médico'}
            </h2>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl leading-none">
              &times;
            </button>
          </div>
          <p className="text-white/80 text-sm">
            Ingresa tus credenciales para acceder a la plataforma.
          </p>
        </div>

        <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="ejemplo@clinica.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center justify-between text-xs font-medium">
            <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600" />
              <span>Recordarme</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all active:scale-95 ${
            type === LoginType.CLIENT ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 hover:bg-slate-900'
          }`}>
            Iniciar Sesión
          </button>

          {type === LoginType.CLIENT && (
            <p className="text-center text-sm text-slate-500 mt-6">
              ¿No tienes cuenta? <a href="#" className="text-blue-600 font-bold hover:underline">Regístrate aquí</a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
