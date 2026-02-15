# React App - Arquitectura con Componentes

Aplicación web desarrollada con React que implementa una arquitectura de componentes padre-hijo, gestión de estado y manejo de props para crear una interfaz interactiva y modular.

## Tecnologías Utilizadas

- **React 18** - Librería de JavaScript para construir interfaces de usuario
- **Vite** - Build tool y dev server de nueva generación
- **CSS3** - Estilos personalizados con diseño responsive
- **JavaScript ES6+** - Sintaxis moderna de JavaScript

## Estructura del Proyecto

```
src/
├── App.jsx                 # Componente padre principal
├── App.css                 # Estilos globales
├── db/
│   └── db.js              # Base de datos (array de objetos)
└── Componentes/
    ├── Header.jsx         # Componente de encabezado
    ├── Menu.jsx           # Componente de lista de items
    └── Order.jsx          # Componente de gestión de orden
```

## Arquitectura de Componentes

### Componente Padre (`App.jsx`)
- **Responsabilidad**: Gestiona el estado global de la aplicación
- **Estado**:
  - `order` - Array de items seleccionados con cantidades
  - `tip` - Porcentaje de propina seleccionado
- **Lógica**:
  - `addToOrder()` - Agrega items o incrementa cantidad si ya existe
  - `removeFromOrder()` - Elimina items de la orden
  - Cálculos: subtotal, propina y total

### Componentes Hijos

#### `Header.jsx`
- Componente presentacional puro
- Sin props ni estado
- Renderiza el encabezado de la aplicación

#### `Menu.jsx`
- **Props recibidas**:
  - `db` - Array de items disponibles
  - `addToOrder` - Función para agregar items
- **Responsabilidad**: Renderiza lista de items disponibles

#### `Order.jsx`
- **Props recibidas**:
  - `order` - Array de items en la orden
  - `tip` - Porcentaje de propina actual
  - `setTip` - Función para actualizar propina
  - `removeFromOrder` - Función para eliminar items
  - `subtotal` - Monto subtotal calculado
  - `tipAmount` - Monto de propina calculado
  - `total` - Monto total calculado
  - `setOrder` - Función para resetear orden
- **Responsabilidad**: Muestra orden actual, propinas y totales

## Flujo de Datos

```
App (Estado Global)
├── Props
├── Header (Sin props)
├── Menu (Recibe: db, addToOrder)
│   └── onClick → addToOrder() → Actualiza estado en App
└── Order (Recibe: order, tip, funciones, cálculos)
    └── onChange/onClick → setTip(), removeFromOrder() → Actualiza estado en App
```

### Patrón de Comunicación
- **Unidireccional**: Los datos fluyen de padre a hijos (props)
- **Lifting State Up**: El estado se mantiene en el componente padre
- **Callback Props**: Los hijos comunican eventos al padre mediante funciones

## Conceptos Implementados

### 1. Estado (useState)
```javascript
const [order, setOrder] = useState([])
const [tip, setTip] = useState(0)
```

### 2. Props Drilling
Los datos y funciones se pasan de App → Componentes hijos

### 3. Evitar Duplicados
```javascript
const existingItem = order.find(item => item.id === newItem.id)
if (existingItem) {
  // Incrementar cantidad
} else {
  // Agregar nuevo
}
```

### 4. Inmutabilidad
```javascript
setOrder([...order, newItem])  // Spread operator
setOrder(order.map(...))        // Map para actualizar
setOrder(order.filter(...))     // Filter para eliminar
```

### 5. Cálculos Derivados
```javascript
const subtotal = order.reduce((sum, item) => sum + (item.price * item.quantity), 0)
const tipAmount = (subtotal * tip) / 100
const total = subtotal + tipAmount
```

## Características de UI/UX

- **Diseño Responsive**: Grid layout adaptable a móviles
- **Estados Interactivos**: Hover effects y transiciones suaves
- **Feedback Visual**: Radio buttons para selección de propina
- **Eliminación Fácil**: Botones "X" para remover items
- **Contador Dinámico**: Incremento automático de cantidad

## Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## Base de Datos

El archivo `db/db.js` exporta un array de objetos con la estructura:

```javascript
export const db = [
  {
    id: 1,
    name: 'Item Name',
    price: 30
  },
]
```

## Conceptos Clave Aprendidos

- Componentes funcionales con Hooks
- Comunicación padre-hijo mediante props
- Gestión de estado con useState
- Manejo de eventos (onClick, onChange)
- Renderizado condicional
- Listas y keys en React
- Cálculos y estado derivado
- Actualización inmutable del estado
- Modularización y separación de responsabilidades

## Notas Técnicas

### Prevención de Duplicados
El sistema verifica si un item ya existe en la orden usando `find()`. Si existe, incrementa la cantidad; si no, lo agrega como nuevo item.

### Identificación Única
Cada item en la orden usa `id` del producto como identificador único, permitiendo operaciones eficientes de búsqueda y eliminación.

### Cálculo en Tiempo Real
Los valores de subtotal, propina y total se calculan dinámicamente en cada render basándose en el estado actual.
