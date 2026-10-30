import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Dondelapao Tienda - Productos de Limpieza',
  description: 'Catálogo y venta de productos de limpieza para el hogar e industria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar totalCarrito={0} />
        {children}
      </body>
    </html>
  );
}