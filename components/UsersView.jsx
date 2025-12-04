import React, { useState, useRef, useEffect } from 'react';
import { UserPlus, Trash2, Briefcase, Shield, Building2, Search, CheckSquare, ChevronDown, Zap, X, Check, Users } from 'lucide-react'; // Agregué 'Users' que faltaba en los imports


const AVAILABLE_SERVICES = [
  "Seguro Médico Premium",
  "Ticket Restaurante",
  "Gimnasio Corporativo",
  "Transporte Privado",
  "Seguro Dental",
  "Bono Teletrabajo",
  "Guardería",
  "Plan de Pensiones"
];

// List of available companies/positions for dropdowns (mock data)
const COMPANIES = ['Boosted Inc.', 'TechFlow Solutions', 'GlobalCorp', 'Innovate SpA'];
const POSITIONS = [
  'Desarrollador Frontend', 'Desarrollador Backend', 'Gerente de RRHH',
  'Analista de Datos', 'Product Designer', 'Especialista RH', 'Soporte Técnico', 'Especialista en Compensaciones' // Agregué el cargo faltante
];

export const UsersView = () => {
  // Initialize with dummy data
  const [users, setUsers] = useState([
    { id: '1', firstName: 'Ana', lastName: 'López', email: 'ana.lopez@boosted.com', company: 'Boosted Inc.', position: 'Gerente de RRHH', role: 'Administrador', services: ['Seguro Médico Premium', 'Ticket Restaurante'] },
    { id: '2', firstName: 'Carlos', lastName: 'Ruiz', email: 'carlos.ruiz@techflow.com', company: 'TechFlow Solutions', position: 'Soporte Técnico', role: 'Soporte', services: ['Gimnasio Corporativo'] },
    { id: '3', firstName: 'María', lastName: 'González', email: 'maria.gonzalez@boosted.com', company: 'Boosted Inc.', position: 'Especialista RH', role: 'Usuario', services: ['Seguro Médico Premium', 'Bono Teletrabajo'] },
    { id: '4', firstName: 'Roberto', lastName: 'Silva', email: 'roberto.silva@globalcorp.com', company: 'GlobalCorp', position: 'Especialista en Compensaciones', role: 'Usuario', services: [] },
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    position: '',
    role: 'Usuario', // Default to User instead of Admin for safety
    services: []
  });

  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- Handlers ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const exists = prev.services.includes(service);
      if (exists) {
        return { ...prev, services: prev.services.filter(s => s !== service) };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company || !formData.position) return;

    const newUser = {
      id: Date.now().toString(),
      ...formData
    };

    setUsers(prev => [newUser, ...prev]);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      position: '',
      role: 'Usuario',
      services: []
    });
    setIsServicesDropdownOpen(false);
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --- Render ---

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">

      {/* Registration Form Container */}
      <div className="relative w-full lg:w-1/3 xl:w-1/4 p-6 overflow-hidden">
        {/* Layer 1: Background & Decoration (Clipped) */}
        <div className="absolute inset-0 bg-indigo-600 dark:bg-slate-800 transform skew-y-3 lg:skew-y-0 lg:skew-x-3 -translate-x-1/2 opacity-10 lg:opacity-10 dark:opacity-20"></div>

        {/* Layer 2: Content (Overflow Visible) */}
        <form onSubmit={handleSubmit} className="relative z-10 bg-white dark:bg-slate-800/80 p-8 rounded-3xl shadow-xl space-y-6 border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
              <UserPlus className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Registrar Usuario</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Añade un nuevo miembro al equipo</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="Juan"
                maxLength={25}
                required
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Apellido</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="Pérez"
                maxLength={25}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email Corporativo</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="usuario@empresa.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Empresa */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Empresa</label>
              <select
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Selecciona una empresa</option>
                {COMPANIES.map(comp => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 absolute right-3 top-[calc(50%+4px)] -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>

            {/* Cargo */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Cargo</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Selecciona un cargo</option>
                {POSITIONS.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 absolute right-3 top-[calc(50%+4px)] -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>

          {/* Rol */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Rol de Sistema</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
              required
            >
              <option value="Administrador">Administrador (Acceso total)</option>
              <option value="Usuario">Usuario (Acceso limitado)</option>
              <option value="Soporte">Soporte (Solo lectura)</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-[calc(50%+4px)] -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>

          {/* Servicios Contratados (Multi-select) */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Servicios Contratados</label>
            <button
              type="button"
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl text-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            >
              <span className={formData.services.length > 0 ? "text-gray-900 dark:text-white font-medium" : "text-gray-400"}>
                {
                  formData.services.length > 0
                    ? `${formData.services.length} servicio(s) seleccionado(s)`
                    : "Seleccionar servicios adicionales..."
                }
              </span>
              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {/* Dropdown Menu */}
            {
              isServicesDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl max-h-60 overflow-y-auto z-20">
                  {
                    AVAILABLE_SERVICES.map((service) => {
                      const isSelected = formData.services.includes(service);
                      return (
                        <div
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors text-sm font-medium
                                                            ${isSelected
                              ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                            }`}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0
                                                            ${isSelected
                              ? 'bg-indigo-600 border-indigo-600 text-white'
                              : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                            }`}
                          >
                            {isSelected && <Check className="h-4 w-4" />}
                          </div>
                          {service}
                        </div>
                      );
                    })
                  }
                </div>
              )
            }
          </div>

          {/* Selected tags preview */}
          {formData.services.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-slate-700">
              {
                formData.services.map(service => (
                  <span key={service} className="flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full">
                    {service}
                    <button
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className="hover:text-indigo-800 dark:hover:text-indigo-200 p-0.5 rounded-full hover:bg-indigo-200/50 dark:hover:bg-indigo-800/50 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              }
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 transition-all active:scale-95 hover:-translate-y-1 mt-6"
          >
            <UserPlus className="h-5 w-5" />
            Registrar Usuario
          </button>
        </form>
      </div>

      {/* List Section */}
      <div className="flex-1 p-6 lg:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="h-7 w-7 text-indigo-600" />
          Usuarios
          <span className="text-xl font-medium text-gray-500 dark:text-gray-400">({users.length})</span>
        </h2>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
          {users.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400 space-y-3">
              <Zap className="h-10 w-10 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">No hay usuarios</h3>
              <p>Usa el formulario de la izquierda para empezar a registrar miembros del equipo.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {users.map(user => (
                <div key={user.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:bg-gray-50 dark:hover:bg-slate-700/50 group">

                  <div className="flex items-center gap-4 w-full sm:w-1/3 shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${user.role === 'Administrador' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'}`}>
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${user.role === 'Administrador' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20' : 'bg-gray-100 text-gray-600 dark:bg-slate-700'}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Company & Position */}
                  <div className="flex flex-col gap-1 w-full sm:w-auto text-sm text-gray-700 dark:text-gray-300">
                    <p className="flex items-center gap-2"><Building2 className="h-4 w-4 text-gray-400" /> {user.company}</p>
                    <p className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gray-400" /> {user.position}</p>
                  </div>

                  {/* Services Display */}
                  {user.services && user.services.length > 0 && (
                    <div className="w-full sm:w-1/3">
                      <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Servicios ({user.services.length})</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {user.services.slice(0, 3).map((s, i) => (
                          <span key={i} className="px-3 py-1 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                            {s}
                          </span>
                        ))}
                        {user.services.length > 3 && (
                          <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-gray-300">
                            +{user.services.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 dark:text-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                      title="Eliminar usuario"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                      title="Editar detalles"
                    >
                      <Shield className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};