'use client';

import { useState } from 'react';
import datos from '../datos_prueba.json';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: boolean;
}

export default function Home() {
  const productos: Producto[] = datos.productos;
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // Obtener lista única de categorías
  const categorias = ['Todas', ...Array.from(new Set(productos.map((p) => p.categoria)))];

  // Filtrar productos por búsqueda y categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === 'Todas' || producto.categoria === categoriaSeleccionada;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-slate-800">Dondelapao Tienda</h1>
          <p className="text-slate-600">Catálogo de Productos de Limpieza</p>
        </header>

        {/* Controles de Búsqueda y Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <input
            type="text"
            placeholder="Buscar producto de limpieza..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  categoriaSeleccionada === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 border hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Productos */}
        {productosFiltrados.length === 0 ? (
          <p className="text-slate-500 text-center py-12">
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-xl shadow-md p-6 border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {producto.categoria}
                  </span>
                  <h2 className="text-lg font-bold text-slate-800 mt-3">
                    {producto.nombre}
                  </h2>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Precio</p>
                    <p className="text-xl font-bold text-slate-900">
                      ${producto.precio.toLocaleString('es-CL')}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      producto.stock
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {producto.stock ? 'Disponible' : 'Agotado'}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}