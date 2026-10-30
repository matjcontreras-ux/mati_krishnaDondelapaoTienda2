// Key de persistencia en localStorage
const STORAGE_KEY = 'dondelapao_productos_v1';

// Inventario inicial de prueba
const productosIniciales = [
  { id: 1, nombre: 'Cloro Tradicional 1L', categoria: 'Desinfectantes', precio: 1500, stock: true, descripcion: 'Cloro concentrado para desinfección profunda de superficies.' },
  { id: 2, nombre: 'Limpiavidrios Gatillo 500ml', categoria: 'Limpieza', precio: 2200, stock: true, descripcion: 'Fórmula antiempañante para vidrios y espejos sin vetas.' },
  { id: 3, nombre: 'Detergente Líquido 3L', categoria: 'Lavandería', precio: 5990, stock: false, descripcion: 'Detergente concentrado para ropa blanca y de color.' },
  { id: 4, nombre: 'Esponja Multiuso (Pack 3)', categoria: 'Accesorios', precio: 1200, stock: true, descripcion: 'Esponjas abrasivas de alta durabilidad para cocina y baño.' }
];

// Inicializar LocalStorage si está vacío
const inicializarStorage = () => {
  if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productosIniciales));
  }
};

// 1. LEER (READ): Obtener todos los productos
export const getProductos = () => {
  if (typeof window === 'undefined') return productosIniciales;
  inicializarStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : productosIniciales;
};

// 1b. LEER POR ID: Obtener producto individual para vista de detalle
export const getProductoById = (id) => {
  const productos = getProductos();
  return productos.find((p) => p.id === Number(id));
};

// 2. CREAR (CREATE): Agregar un nuevo producto (para panel administrador)
export const crearProducto = (nuevoProducto) => {
  const productos = getProductos();
  const productoConId = {
    ...nuevoProducto,
    id: productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1
  };
  const listaActualizada = [...productos, productoConId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listaActualizada));
  return productoConId;
};

// 3. ACTUALIZAR (UPDATE): Editar un producto existente
export const actualizarProducto = (id, productoActualizado) => {
  const productos = getProductos();
  const listaActualizada = productos.map((p) =>
    p.id === Number(id) ? { ...p, ...productoActualizado } : p
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listaActualizada));
  return true;
};

// 4. ELIMINAR (DELETE): Borrar un producto
export const eliminarProducto = (id) => {
  const productos = getProductos();
  const listaActualizada = productos.filter((p) => p.id !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listaActualizada));
  return true;
};