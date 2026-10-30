'use client';

import { useState, useEffect } from 'react';
import { getProductos } from '../../services/productoService';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: boolean;
  descripcion?: string;
}

export default function CategoriasPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string>('Todas');

  useEffect(() => {
    setProductos(getProductos());
  }, []);

  const categorias = ['Todas', ...Array.from(new Set(productos.map((p) => p.categoria)))];

  const productosFiltrados =
    categoriaActiva === 'Todas'
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  return (
    <main className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark">Categorías de Productos</h1>
        <p className="text-muted">Explora nuestro catálogo según la categoría que necesites</p>
      </div>

      {/* Botones de Filtro por Categoría */}
      <div className="d-flex justify-content-center gap-2 flex-wrap mb-4">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            className={`btn ${
              categoriaActiva === cat ? 'btn-primary' : 'btn-outline-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grilla de Productos por Categoría */}
      <div className="row g-4">
        {productosFiltrados.map((prod) => (
          <div key={prod.id} className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <span className="badge bg-info text-dark mb-2">{prod.categoria}</span>
                  <h5 className="card-title fw-bold text-dark">{prod.nombre}</h5>
                  <p className="card-text text-muted small">{prod.descripcion}</p>
                </div>
                <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                  <span className="fs-5 fw-bold text-primary">
                    ${prod.precio.toLocaleString('es-CL')}
                  </span>
                  <span className={`badge ${prod.stock ? 'bg-success' : 'bg-danger'}`}>
                    {prod.stock ? 'Disponible' : 'Agotado'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}