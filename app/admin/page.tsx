'use client';

import { useState, useEffect } from 'react';
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../../services/productoService';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: boolean;
  descripcion?: string;
}

export default function AdminPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  
  // Estado para nuevo producto / edición
  const [form, setForm] = useState({
    nombre: '',
    categoria: 'Desinfectantes',
    precio: 0,
    stock: true,
    descripcion: '',
  });

  const cargarProductos = () => {
    setProductos(getProductos());
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editandoId) {
      actualizarProducto(editandoId, {
        ...form,
        precio: Number(form.precio),
      });
      setEditandoId(null);
    } else {
      crearProducto({
        ...form,
        precio: Number(form.precio),
      });
    }
    setForm({ nombre: '', categoria: 'Desinfectantes', precio: 0, stock: true, descripcion: '' });
    cargarProductos();
  };

  const handleEditar = (p: Producto) => {
    setEditandoId(p.id);
    setForm({
      nombre: p.nombre,
      categoria: p.categoria,
      precio: p.precio,
      stock: p.stock,
      descripcion: p.descripcion || '',
    });
  };

  const handleEliminar = (id: number) => {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      eliminarProducto(id);
      cargarProductos();
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm({ nombre: '', categoria: 'Desinfectantes', precio: 0, stock: true, descripcion: '' });
  };

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Panel de Administración</h1>
          <p className="text-muted mb-0">Gestión de Inventario y Operaciones CRUD</p>
        </div>
        <span className="badge bg-primary fs-6">
          Total Productos: {productos.length}
        </span>
      </div>

      <div className="row g-4">
        {/* Formulario Crear / Editar */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold mb-3">
              {editandoId ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre del Producto</label>
                <input
                  type="text"
                  name="nombre"
                  required
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Categoría</label>
                <select
                  name="categoria"
                  className="form-select"
                  value={form.categoria}
                  onChange={handleChange}
                >
                  <option value="Desinfectantes">Desinfectantes</option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="Lavandería">Lavandería</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Precio ($ CLP)</label>
                <input
                  type="number"
                  name="precio"
                  required
                  min="1"
                  className="form-control"
                  value={form.precio}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  name="descripcion"
                  rows={2}
                  className="form-control"
                  value={form.descripcion}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="stock"
                  id="stockCheck"
                  className="form-check-input"
                  checked={form.stock}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="stockCheck">
                  Producto Disponible (Stock)
                </label>
              </div>

              <button type="submit" className="btn btn-success w-100 fw-bold mb-2">
                {editandoId ? 'Guardar Cambios' : 'Crear Producto'}
              </button>

              {editandoId && (
                <button
                  type="button"
                  onClick={cancelarEdicion}
                  className="btn btn-outline-secondary w-100"
                >
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Tabla de Productos Existentes */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td className="fw-bold">#{p.id}</td>
                      <td>
                        <strong>{p.nombre}</strong>
                        <br />
                        <small className="text-muted">{p.descripcion}</small>
                      </td>
                      <td>
                        <span className="badge bg-secondary">{p.categoria}</span>
                      </td>
                      <td className="fw-bold">${p.precio.toLocaleString('es-CL')}</td>
                      <td>
                        <span className={`badge ${p.stock ? 'bg-success' : 'bg-danger'}`}>
                          {p.stock ? 'Disponible' : 'Agotado'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleEditar(p)}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(p.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}