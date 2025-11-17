# ITX frontend test

## Solución

Esta es una solución a la prueba técnica propuesta en el archivo [enunciado.pdf](./enunciado.pdf).

## Tecnologías utilizadas

- **React 19** - Librería para construir interfaces de usuario
- **React Router v7** - Enrutamiento del lado del cliente
- **TanStack Query v5** - Gestión del estado del servidor, caché y sincronización de datos
- **Axios** - Cliente HTTP para las llamadas a la API
- **Vite** - Build tool y dev server de última generación
- **Vitest** - Framework de testing unitario
- **Testing Library** - Utilities para testing de componentes React
- **ESLint** - Linter para mantener la calidad del código
- **Prettier** - Formateador de código
- **Husky + lint-staged** - Pre-commit hooks para validación de código

## Decisiones técnicas

### TanStack Query (React Query)

Se optó por utilizar TanStack Query como solución para la gestión del estado del servidor por las siguientes razones:

- **Caché automática**: Evita peticiones innecesarias al servidor y mejora la experiencia de usuario
- **Sincronización de datos**: Mantiene los datos actualizados automáticamente mediante políticas de refetch
- **Estados de carga**: Proporciona estados integrados para loading, error y success
- **Devtools**: Incluye herramientas de desarrollo para depurar el estado de las queries
- **Optimistic updates**: Facilita la implementación de actualizaciones optimistas
- **Menos boilerplate**: Reduce significativamente el código necesario comparado con gestión manual de estado

### Estructura del proyecto

El proyecto sigue una arquitectura en capas:

- **`/core`**: Lógica de negocio, repositorios y servicios
- **`/ui`**: Componentes de interfaz, hooks personalizados y vistas
- Separación clara entre presentación y lógica de datos

### Gestión del carrito

**Nota importante**: La API al agregar productos al carrito siempre devuelve `count: 1` independientemente de la cantidad real de items. Por esta razón, en lugar de persistir directamente el dato recibido del servidor como indica el enunciado, se decidió mantener un conteo local en el contexto de React después de recibir confirmación exitosa desde la API.

## Inicio rápido

### Configuración inicial

Copiar el archivo de variables de entorno:

```bash
cp .env.example .env
```

### Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Ejecutar tests
npm test

# Linter
npm run lint

# Formatear código
npm run prettier
```

La aplicación estará disponible en `http://localhost:5173`

### Con Docker

```bash
# Levantar el proyecto
make start

# Ejecutar tests
make test

# Detener el proyecto
make stop
```

La aplicación estará disponible en `http://localhost:3000`

## Comandos disponibles

### Docker

```bash
make start    # Construir y ejecutar la aplicación
make test     # Ejecutar tests en Docker
make stop     # Detener y eliminar el contenedor
make clean    # Limpiar contenedor e imágenes
```

### NPM

```bash
npm start           # Servidor de desarrollo
npm run build       # Build de producción
npm test            # Ejecutar tests
npm run test:watch  # Tests en modo watch
npm run lint        # Ejecutar linter
npm run prettier    # Formatear código
```

## Testing

El proyecto mantiene un coverage de tests superior al 80%. Se utilizan tests unitarios para validar:

- Componentes de UI
- Hooks personalizados
- Servicios y repositorios
- Utilidades y helpers

Los tests se ejecutan con Vitest y Testing Library, siguiendo las mejores prácticas de testing en React.
