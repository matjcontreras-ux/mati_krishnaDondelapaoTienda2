'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  totalCarrito?: number;
}

export default function Navbar({ totalCarrito = 0 }: NavbarProps) {
  const [busqueda, setBusqueda] = useState('');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" href="/">
          <i className="bi bi-shop me-2"></i>Dondelapao Tienda
        </Link>

        <div className="d-flex mx-auto my-2 my-lg-0 w-50">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar productos de limpieza..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="button">
            Buscar
          </button>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link href="/login" className="btn btn-outline-secondary btn-sm">
            Iniciar Sesión
          </Link>
          <Link href="/registro" className="btn btn-primary btn-sm">
            Crear Cuenta
          </Link>
          <Link href="/carrito" className="btn btn-success btn-sm ms-2 d-flex align-items-center">
            <i className="bi bi-cart-fill me-1"></i> Carrito (${totalCarrito.toLocaleString('es-CL')})
          </Link>
        </div>
      </div>

      <div className="w-100 bg-white border-top py-2 mt-2">
        <div className="container d-flex justify-content-center gap-4 flex-wrap small">
          <Link href="/" className="text-decoration-none text-dark fw-semibold">Home</Link>
          <Link href="/categorias" className="text-decoration-none text-secondary">Categorías</Link>
          <Link href="/ofertas" className="text-decoration-none text-secondary">Ofertas</Link>
          <Link href="/nosotros" className="text-decoration-none text-secondary">Nosotros</Link>
          <Link href="/blog" className="text-decoration-none text-secondary">Blog</Link>
          <Link href="/contacto" className="text-decoration-none text-secondary">Contacto</Link>
          <Link href="/admin" className="text-decoration-none text-danger fw-bold ms-lg-4">
            <i className="bi bi-shield-lock me-1"></i>Panel Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}