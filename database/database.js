// =============================================
// 1. COLECCIÓN: usuarios
// =============================================

// Insertar un usuario (insertOne)
db.usuarios.insertOne({
  username: "carlos23",
  email: "carlos@example.com",
  password: "segura123",
  rol: "cliente",
  fecha_creacion: new Date("2025-05-25")
});

// Insertar varios usuarios (insertMany)
db.usuarios.insertMany([
  {
    username: "admin2",
    email: "admin2@example.com",
    password: "adminsecure",
    rol: "admin",
    fecha_creacion: new Date("2025-05-25")
  },
  {
    username: "mariana_99",
    email: "mariana@example.com",
    password: "password456",
    rol: "cliente",
    fecha_creacion: new Date("2025-05-26")
  },
  {
    username: "pedro_dev",
    email: "pedro@example.com",
    password: "devpassword",
    rol: "cliente",
    fecha_creacion: new Date("2025-05-27")
  },
  {
    username: "sofia_moda",
    email: "sofia@example.com",
    password: "sofiapass",
    rol: "cliente",
    fecha_creacion: new Date("2025-05-28")
  }
]);

// Actualizar usuario
db.usuarios.updateOne(
  { username: "carlos23" },
  { $set: { email: "carlos.nuevo@example.com" } }
);

// Eliminar usuario
db.usuarios.deleteOne({ username: "admin2" });


// =============================================
// 2. COLECCIÓN: marcas
// =============================================

// Insertar una marca (insertOne)
db.marcas.insertOne({
  nombre: "Nike",
  pais_origen: "Estados Unidos",
  sitio_web: "https://www.nike.com"
});

// Insertar varias marcas (insertMany)
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
  },
  {
    nombre: "Levi's",
    pais_origen: "Estados Unidos",
    sitio_web: "https://www.levis.com"
  },
  {
    nombre: "Puma",
    pais_origen: "Alemania",
    sitio_web: "https://www.puma.com"
  }
]);

// Actualizar sitio web de una marca
db.marcas.updateOne(
  { nombre: "Zara" },
  { $set: { sitio_web: "https://www.zara.com/cr" } }
);

// Eliminar una marca
db.marcas.deleteOne({ nombre: "Puma" });


// =============================================
// 3. COLECCIÓN: prendas
// =============================================

// Insertar una prenda (insertOne)
db.prendas.insertOne({
  nombre: "Camiseta Deportiva",
  marca: "Nike",
  talla: "M",
  precio: 25.5,
  cantidad_stock: 45
});

// Insertar varias prendas (insertMany)
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
  },
  {
    nombre: "Chaqueta Denim",
    marca: "Levi's",
    talla: "M",
    precio: 65.0,
    cantidad_stock: 10
  },
  {
    nombre: "Tenis Urbanas Air",
    marca: "Nike",
    talla: "41",
    precio: 90.0,
    cantidad_stock: 8
  },
  {
    nombre: "Gorra Casual",
    marca: "Adidas",
    talla: "Única",
    precio: 18.0,
    cantidad_stock: 30
  }
]);

// Actualizar precio de una prenda
db.prendas.updateOne(
  { nombre: "Camiseta Deportiva" },
  { $set: { precio: 28.0 } }
);

// Eliminar una prenda
db.prendas.deleteOne({ nombre: "Gorra Casual" });


// =============================================
// 4. COLECCIÓN: ventas
// =============================================

// Insertar una venta (insertOne)
db.ventas.insertOne({
  prenda: { nombre: "Camiseta Deportiva" },
  fecha_venta: new Date("2025-05-30"),
  cantidad: 2,
  total: 56.0,
  usuario: { username: "carlos23" }
});

// Insertar varias ventas (insertMany)
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
    usuario: { username: "mariana_99" }
  },
  {
    prenda: { nombre: "Chaqueta Denim" },
    fecha_venta: new Date("2025-05-30"),
    cantidad: 1,
    total: 65.0,
    usuario: { username: "pedro_dev" }
  },
  {
    prenda: { nombre: "Tenis Urbanas Air" },
    fecha_venta: new Date("2025-06-01"),
    cantidad: 2,
    total: 180.0,
    usuario: { username: "sofia_moda" }
  },
  {
    prenda: { nombre: "Hoodie Básica" },
    fecha_venta: new Date("2025-06-01"),
    cantidad: 4,
    total: 140.0,
    usuario: { username: "mariana_99" }
  }
]);

// Actualizar total de una venta
db.ventas.updateOne(
  { "prenda.nombre": "Jeans Slim Fit", cantidad: 1 },
  { $set: { total: 42.0 } }
);

// Eliminar una venta
db.ventas.deleteOne({ "prenda.nombre": "Chaqueta Denim", cantidad: 1 });


/// =============================================
/// CONSULTAS DE LECTURA (REQUERIDAS)
/// =============================================

// Consulta 1: Obtener la cantidad vendida de prendas por fecha y filtrarla con una fecha específica.
// Explica qué hace: Filtra los registros de ventas de una fecha exacta (2025-05-30) y agrupa sumando la cantidad total de prendas vendidas en ese día.
db.ventas.aggregate([
  {
    $match: {
      fecha_venta: {
        $eq: new Date("2025-05-30")
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

// Consulta 2: Obtener la lista de todas las marcas que tienen al menos una venta.
// Explica qué hace: Relaciona la colección de ventas con la de prendas mediante $lookup para identificar a qué marca pertenece cada prenda vendida, y agrupa los resultados de forma única sin repetir marcas.
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

// Consulta 3: Obtener prendas vendidas y su cantidad restante en stock.
// Explica qué hace: Agrupa las ventas totales por prenda y hace un cruce con la colección de prendas para contrastar lo vendido frente a la cantidad actual restante en el inventario.
db.ventas.aggregate([
  {
    $group: {
      _id: "$prenda.nombre",
      total_vendido: { $sum: "$cantidad" }
    }
  },
  {
    $lookup: {
      from: "prendas",
      localField: "_id",
      foreignField: "nombre",
      as: "detalles_prenda"
    }
  },
  { $unwind: "$detalles_prenda" },
  {
    $project: {
      _id: 0,
      prenda: "$_id",
      total_vendido: 1,
      stock_restante: "$detalles_prenda.cantidad_stock"
    }
  }
]);

// Consulta 4: Obtener listado de las 5 marcas más vendidas y su cantidad de ventas.
// Explica qué hace: Relaciona ventas con prendas para determinar la marca de cada artículo, acumula las unidades vendidas por marca, ordena los resultados de mayor a menor y limita el listado a las primeras 5.
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
