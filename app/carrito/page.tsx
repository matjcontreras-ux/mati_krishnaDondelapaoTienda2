'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  useEffect(() => {
    // Cargar carrito desde localStorage o items de ejemplo si está vacío
    const itemsGuardados = localStorage.getItem('dondelapao_carrito');
    if (itemsGuardados) {
      setCarrito(JSON.parse(itemsGuardados));
    } else {
      const itemsEjemplo: ItemCarrito[] = [
        { id: 1, nombre: 'Cloro Tradicional 1L', precio: 1500, cantidad: 2 },
        { id: 2, nombre: 'Limpiavidrios Gatillo 500ml', precio: 2200, cantidad: 1 }
      ];
      setCarrito(itemsEjemplo);
      localStorage.setItem('dondelapao_carrito', JSON.stringify(itemsEjemplo));
    }
  }, []);

  const actualizarCantidad = (id: number, cambio: number) => {
    const actualizado = carrito
      .map((item) => {
        if (item.id === id) {
          const nuevaCantidad = item.cantidad + cambio;
          return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : item;
        }
        return item;
      });
    setCarrito(actualizado);
    localStorage.setItem('dondelapao_carrito', JSON.stringify(actualizado));
  };

  const eliminarItem = (id: number) => {
    const actualizado = carrito.filter((item) => item.id !== id);
    setCarrito(actualizado);
    localStorage.setItem('dondelapao_carrito', JSON.stringify(actualizado));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <main className="container py-5">
      <h1 className="fw-bold mb-4">Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <p className="fs-5 text-muted">Tu carrito está vacío.</p>
          <Link href="/" className="btn btn-primary">Volver al Catálogo</Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item) => (
                      <tr key={item.id}>
                        <td className="fw-bold">{item.nombre}</td>
                        <td>${item.precio.toLocaleString('es-CL')}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              onClick={() => actualizarCantidad(item.id, -1)}
                              className="btn btn-sm btn-outline-secondary"
                            >
                              -
                            </button>
                            <span className="fw-bold">{item.cantidad}</span>
                            <button
                              onClick={() => actualizarCantidad(item.id, 1)}
                              className="btn btn-sm btn-outline-secondary"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                        <td>
                          <button
                            onClick={() => eliminarItem(item.id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            <i className="bi bi-trash"></i> Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card shadow-sm border-0 p-4">
              <h5 className="fw-bold mb-3">Resumen del Pedido</h5>
              <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
                <span>Total:</span>
                <span className="text-primary">${total.toLocaleString('es-CL')}</span>
              </div>
              <Link href="/checkout" className="btn btn-success btn-lg w-100 fw-bold">
                Comprar ahora
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}