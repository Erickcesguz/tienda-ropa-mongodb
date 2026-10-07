### 2. Código para el archivo `database/operaciones.js`

```javascript
// 👕 CRUD para Tienda de Ropa usando MongoDB

// Conexión a la base de datos
use tiendaRopaDB;

// ---------------------------------------------
// Colección: usuarios
// ---------------------------------------------

// Crear usuarios
db.usuarios.insertMany([
  {
    username: "carlos23",
    email: "carlos@example.com",
    password: "segura123",
    rol: "cliente",
    fecha_creacion: new Date("2025-05-25")
  },
  {
    username: "admin2",
    email: "admin2@example.com",
    password: "adminsecure",
    rol: "admin",
    fecha_creacion: new Date("2025-05-25")
  }
]);

// Actualizar usuario
db.usuarios.updateOne(
  { username: "carlos23" },
  { $set: { email: "nuevo_correo@example.com" } }
);

// Eliminar usuario
db.usuarios.deleteOne({ username: "admin2" });

// ---------------------------------------------
// Colección: marcas
// ---------------------------------------------

// Insertar una marca
db.marcas.insertOne({
  nombre: "Nike",
  pais_origen: "Estados Unidos",
  sitio_web: "https://www.nike.com"
});

// Insertar varias marcas
db.marcas.insertMany([
  {
    nombre: "Adidas",
    pais_origen: "Alemania",
    sitio_web: "https://www.adidas.com"
  },
  {
    nombre: "Zara",
    pais_origen: "España",
    sitio_web: "https://www.zara.com"
  }
]);

// Actualizar sitio web de una marca
db.marcas.updateOne(
  { nombre: "Zara" },
  { $set: { sitio_web: "https://www.zara.com/cr" } }
);

// Eliminar una marca
db.marcas.deleteOne({ nombre: "Adidas" });

// ---------------------------------------------
// Colección: prendas
// ---------------------------------------------

// Insertar una prenda
db.prendas.insertOne({
  nombre: "Camiseta Deportiva",
  marca: "Nike",
  talla: "M",
  precio: 25.5,
  cantidad_stock: 45
});

// Insertar varias prendas
db.prendas.insertMany([
  {
    nombre: "Jeans Slim Fit",
    marca: "Zara",
    talla: "32",
    precio: 40.0,
    cantidad_stock: 20
  },
  {
    nombre: "Hoodie Básica",
    marca: "Adidas",
    talla: "L",
    precio: 35.0,
    cantidad_stock: 15
  }
]);

// Actualizar precio de una prenda
db.prendas.updateOne(
  { nombre: "Camiseta Deportiva" },
  { $set: { precio: 28.0 } }
);

// Eliminar una prenda
db.prendas.deleteOne({ nombre: "Hoodie Básica" });

// ---------------------------------------------
// Colección: ventas
// ---------------------------------------------

// Insertar una venta
db.ventas.insertOne({
  prenda: { nombre: "Camiseta Deportiva" },
  fecha_venta: new Date("2025-05-30"),
  cantidad: 2,
  total: 51.0,
  usuario: { username: "carlos23" }
});

// Insertar varias ventas
db.ventas.insertMany([
  {
    prenda: { nombre: "Jeans Slim Fit" },
    fecha_venta: new Date("2025-05-31"),
    cantidad: 1,
    total: 40.0,
    usuario: { username: "carlos23" }
  },
  {
    prenda: { nombre: "Camiseta Deportiva" },
    fecha_venta: new Date("2025-05-30"),
    cantidad: 3,
    total: 84.0,
    usuario: { username: "juanperez" }
  }
]);

// Actualizar total de una venta
db.ventas.updateOne(
  { "prenda.nombre": "Jeans Slim Fit", cantidad: 1 },
  { $set: { total: 42.0 } }
);

// Eliminar una venta
db.ventas.deleteOne({ "prenda.nombre": "Jeans Slim Fit", cantidad: 1 });

/// =============================================
/// Consultas para reportes:
/// =============================================

// 1. Obtener la cantidad vendida de prendas por fecha y filtrarla con una fecha específica
db.ventas.aggregate([
  {
    $match: {
      fecha_venta: {
        $eq: new Date("2025-05-30") // Cambiar fecha según necesidad
      }
    }
  },
  {
    $group: {
      _id: "$fecha_venta",
      total_prendas_vendidas: { $sum: "$cantidad" }
    }
  }
]);

// 2. Obtener la lista de todas las marcas que tienen al menos una venta
db.ventas.aggregate([
  {
    $lookup: {
      from: "prendas",
      localField: "prenda.nombre",
      foreignField: "nombre",
      as: "info_prenda"
    }
  },
  { $unwind: "$info_prenda" },
  {
    $group: {
      _id: "$info_prenda.marca"
    }
  }
]);

// 3. Obtener prendas vendidas y su cantidad restante en stock
db.prendas.find(
  {},
  { nombre: 1, cantidad_stock: 1, _id: 0 }
);

// 4. Obtener listado de las 5 marcas más vendidas y su cantidad de ventas
db.ventas.aggregate([
  {
    $lookup: {
      from: "prendas",
      localField: "prenda.nombre",
      foreignField: "nombre",
      as: "info_prenda"
    }
  },
  { $unwind: "$info_prenda" },
  {
    $group: {
      _id: "$info_prenda.marca",
      total_ventas: { $sum: "$cantidad" }
    }
  },
  { $sort: { total_ventas: -1 } },
  { $limit: 5 }
]);
