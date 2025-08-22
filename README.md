# React Components Demo

A modern React component library built with TypeScript, featuring two powerful components: **InputField** and **DataTable**. This project demonstrates modern React development patterns, comprehensive accessibility features, and professional-grade component design.

## 🚀 Features

### InputField Component
- **Multiple Variants**: Filled, outlined, and ghost styles
- **Size Options**: Small, medium, and large sizes
- **Validation States**: Valid, invalid, disabled, and loading states
- **Advanced Features**: Clear button, password toggle, helper text, error messages
- **Theme Support**: Light and dark theme variants
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### DataTable Component
- **Data Display**: Flexible tabular data presentation
- **Sorting**: Column-based sorting with visual indicators
- **Row Selection**: Single and multiple row selection
- **Pagination**: Built-in pagination controls
- **Responsive Design**: Mobile-friendly table layout
- **Custom Rendering**: Custom cell content rendering
- **Loading States**: Loading and empty state handling

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **CSS3** - Modern styling with CSS custom properties
- **Storybook** - Component documentation and testing
- **Webpack** - Module bundling and development server

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-components-demo
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Usage

### Development Server
Start the development server:
```bash
npm start
```
The app will open at `http://localhost:3000`

### Storybook
Launch Storybook for component documentation:
```bash
npm run storybook
```
Storybook will open at `http://localhost:6006`

### Build
Create a production build:
```bash
npm run build
```

## 🧩 Component Usage

### InputField

```tsx
import { InputField } from './components/InputField';

// Basic usage
<InputField
  label="Email Address"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

// With validation
<InputField
  label="Password"
  placeholder="Enter password"
  passwordToggle
  invalid
  errorMessage="Password is required"
/>

// Advanced features
<InputField
  label="Username"
  placeholder="Choose username"
  variant="filled"
  size="lg"
  clearable
  loading
/>
```

### DataTable

```tsx
import { DataTable, type Column } from './components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
];

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

// Basic table
<DataTable
  data={users}
  columns={columns}
/>

// With selection and pagination
<DataTable
  data={users}
  columns={columns}
  selectable
  onRowSelect={(selectedRows) => console.log(selectedRows)}
  pagination={{
    current: 1,
    pageSize: 10,
    total: users.length,
    onChange: (page) => setCurrentPage(page),
  }}
/>
```

## 🎨 Component Props

### InputField Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Input value |
| `onChange` | `function` | - | Change handler |
| `label` | `string` | - | Input label |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text below input |
| `errorMessage` | `string` | - | Error message |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Invalid state |
| `loading` | `boolean` | `false` | Loading state |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | `'outlined'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `clearable` | `boolean` | `false` | Show clear button |
| `passwordToggle` | `boolean` | `false` | Show password toggle |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | - | Array of data objects |
| `columns` | `Column<T>[]` | - | Column definitions |
| `loading` | `boolean` | `false` | Loading state |
| `selectable` | `boolean` | `false` | Enable row selection |
| `onRowSelect` | `function` | - | Row selection handler |
| `emptyText` | `string` | `'No data available'` | Empty state message |
| `rowKey` | `keyof T \| function` | - | Custom row key |

## 🎯 Design Principles

- **Accessibility First**: WCAG 2.1 AA compliance
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized rendering and minimal re-renders
- **Type Safety**: Full TypeScript coverage
- **Modern Patterns**: React hooks, functional components
- **Consistent API**: Unified prop patterns across components

## ♿ Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **High Contrast**: High contrast mode support
- **Reduced Motion**: Respects user motion preferences
- **Screen Reader**: Optimized for assistive technologies

## 🌙 Theme Support

Both components support light and dark themes with automatic detection:

```tsx
// Light theme (default)
<InputField theme="light" />

// Dark theme
<InputField theme="dark" />

// Automatic theme detection
@media (prefers-color-scheme: dark) {
  /* Dark theme styles applied automatically */
}
```

## 📱 Responsive Design

Components are built with a mobile-first approach:

- **Mobile**: Optimized for small screens
- **Tablet**: Enhanced layout for medium screens
- **Desktop**: Full feature set for large screens
- **Touch Friendly**: Optimized for touch interactions

## 🧪 Testing

Components are thoroughly tested with Storybook:

- **Visual Testing**: Component variations and states
- **Interaction Testing**: User interactions and behaviors
- **Accessibility Testing**: ARIA compliance and keyboard navigation
- **Responsive Testing**: Different viewport sizes

## 📚 Storybook Stories

Each component includes comprehensive Storybook stories:

- **Default**: Basic usage examples
- **Variants**: Different visual styles
- **States**: Various component states
- **Accessibility**: Accessibility features showcase
- **Complex Examples**: Advanced usage patterns

## 🚀 Performance Features

- **Memoization**: Optimized re-rendering
- **Lazy Loading**: Efficient component loading
- **CSS Optimization**: Minimal CSS bundle size
- **Tree Shaking**: Unused code elimination

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- React team for the amazing framework
- TypeScript team for type safety
- Storybook team for component documentation
- Webpack team for module bundling

---

Built with ❤️ using modern web technologies
