'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    calle: '',
    depto: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago',
    indicaciones: ''
  });

  useEffect(() => {
    const itemsGuardados = localStorage.getItem('dondelapao_carrito');
    if (itemsGuardados) {
      const items = JSON.parse(itemsGuardados);
      const suma = items.reduce((acc: number, item: any) => acc + item.precio * item.cantidad, 0);
      setTotal(suma);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('dondelapao_orden', JSON.stringify({ ...formData, total }));
    // Simula flujo de pago exitoso
    router.push('/pago-exitoso');
  };

  return (
    <main className="container py-5" style={{ maxWidth: '800px' }}>
      <div className="card shadow-sm border-0 p-4">
        <h2 className="fw-bold mb-3">Carrito de Compra</h2>
        <div className="alert alert-primary d-flex justify-content-between align-items-center">
          <span className="fw-bold">Total a pagar:</span>
          <span className="fs-4 fw-bold">${total.toLocaleString('es-CL')}</span>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <h5 className="fw-bold border-bottom pb-2 mb-3">Información del Cliente</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                required
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                name="apellido"
                required
                className="form-control"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                name="correo"
                required
                className="form-control"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>
          </div>

          <h5 className="fw-bold border-bottom pb-2 mb-3">Dirección de Entrega</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-8">
              <label className="form-label">Calle y Número</label>
              <input
                type="text"
                name="calle"
                required
                className="form-control"
                value={formData.calle}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Depto / Casa (Opcional)</label>
              <input
                type="text"
                name="depto"
                className="form-control"
                value={formData.depto}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Región</label>
              <select name="region" className="form-select" value={formData.region} onChange={handleChange}>
                <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Comuna</label>
              <input
                type="text"
                name="comuna"
                required
                className="form-control"
                value={formData.comuna}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Indicaciones de entrega (Opcional)</label>
              <textarea
                name="indicaciones"
                className="form-rows-2 form-control"
                value={formData.indicaciones}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-success btn-lg w-100 fw-bold">
            Pagar ahora ${total.toLocaleString('es-CL')}
          </button>
        </form>
      </div>
    </main>
  );
}