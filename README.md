# Sistema online para Tienda de Ropa

Este proyecto consiste en la creación de una base de datos no relacional con MongoDB para una tienda de ropa, permitiendo la gestión de usuarios, marcas, prendas y ventas. El sistema completo ofrece operaciones básicas como inserción, actualización, eliminación y consultas avanzadas para el control de inventario y reportes de ventas.

## 📚 Colecciones y Ejemplos

### 👤 Usuarios
```json
{
  "username": "carlos23",
  "email": "carlos@example.com",
  "password": "segura123",
  "rol": "cliente",
  "fecha_creacion": "2025-05-25T00:00:00.000Z"
}
```
### 🏷️ Marcas
```json
{
  "nombre": "Nike",
  "pais_origen": "Estados Unidos",
  "sitio_web": "[https://www.nike.com](https://www.nike.com)"
}
```
### 👕 Prendas
```json
{
  "nombre": "Camiseta Deportiva",
  "marca": "Nike",
  "talla": "M",
  "precio": 25.5,
  "cantidad_stock": 45
}
```
### 🧾 Ventas
```json
{
  "prenda": {
    "nombre": "Camiseta Deportiva"
  },
  "fecha_venta": "2025-05-30T00:00:00.000Z",
  "cantidad": 2,
  "total": 51.0,
  "usuario": {
    "username": "carlos23"
  }
}
```
### 👥 Integrante del Proyecto
#### Erick Cespesdes Guzman
