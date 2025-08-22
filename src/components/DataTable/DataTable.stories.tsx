import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, type Column } from './DataTable';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A feature-rich data table component with sorting, row selection, pagination, and responsive design.',
      },
    },
  },
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      description: 'Whether to show loading state',
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Whether rows can be selected',
    },
    onRowSelect: { action: 'row selected' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'active', lastLogin: '2024-01-13' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', lastLogin: '2024-01-12' },
];

const sampleProducts: Product[] = [
  { id: 'P001', name: 'Laptop', category: 'Electronics', price: 999.99, stock: 15, rating: 4.5 },
  { id: 'P002', name: 'Mouse', category: 'Electronics', price: 29.99, stock: 50, rating: 4.2 },
  { id: 'P003', name: 'Keyboard', category: 'Electronics', price: 79.99, stock: 25, rating: 4.0 },
  { id: 'P004', name: 'Monitor', category: 'Electronics', price: 299.99, stock: 10, rating: 4.7 },
  { id: 'P005', name: 'Headphones', category: 'Electronics', price: 149.99, stock: 30, rating: 4.3 },
];

// Column definitions
const userColumns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true, width: 80, align: 'center' },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { 
    key: 'status', 
    title: 'Status', 
    dataIndex: 'status', 
    sortable: true,
    render: (value) => (
      <span style={{ 
        padding: '0.25rem 0.5rem', 
        borderRadius: '0.25rem', 
        fontSize: '0.75rem',
        backgroundColor: value === 'active' ? '#dcfce7' : '#fef2f2',
        color: value === 'active' ? '#166534' : '#dc2626'
      }}>
        {value}
      </span>
    )
  },
  { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
];

const productColumns: Column<Product>[] = [
  { key: 'id', title: 'Product ID', dataIndex: 'id', sortable: true, width: 100 },
  { key: 'name', title: 'Product Name', dataIndex: 'name', sortable: true },
  { key: 'category', title: 'Category', dataIndex: 'category', sortable: true },
  { 
    key: 'price', 
    title: 'Price', 
    dataIndex: 'price', 
    sortable: true,
    align: 'right',
    render: (value) => `$${value.toFixed(2)}`
  },
  { 
    key: 'stock', 
    title: 'Stock', 
    dataIndex: 'stock', 
    sortable: true,
    align: 'center',
    render: (value) => (
      <span style={{ 
        color: value > 20 ? '#166534' : value > 10 ? '#ca8a04' : '#dc2626',
        fontWeight: '500'
      }}>
        {value}
      </span>
    )
  },
  { 
    key: 'rating', 
    title: 'Rating', 
    dataIndex: 'rating', 
    sortable: true,
    align: 'center',
    render: (value) => (
      <span style={{ color: '#ca8a04', fontWeight: '500' }}>
        ★ {value}
      </span>
    )
  },
];

// Basic DataTable
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
};

// With row selection
export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
  },
};

// With loading state
export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyText: 'No users found. Try adjusting your search criteria.',
  },
};

// Products table
export const ProductsTable: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    selectable: true,
  },
};

// With pagination
export const WithPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 2;
    const total = sampleUsers.length;
    
    const paginatedData = sampleUsers.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    
    return (
      <DataTable
        data={paginatedData}
        columns={userColumns}
        selectable
        pagination={{
          current: currentPage,
          pageSize,
          total,
          onChange: setCurrentPage,
        }}
      />
    );
  },
};

// Complex example with all features
export const ComplexExample: Story = {
  render: () => {
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 3;
    const total = sampleUsers.length;
    
    const paginatedData = sampleUsers.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Selected Users: {selectedUsers.length}</h3>
          {selectedUsers.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: '1rem' }}>
              {selectedUsers.map(user => (
                <li key={user.id}>{user.name} ({user.email})</li>
              ))}
            </ul>
          )}
        </div>
        
        <DataTable
          data={paginatedData}
          columns={userColumns}
          selectable
          onRowSelect={setSelectedUsers}
          pagination={{
            current: currentPage,
            pageSize,
            total,
            onChange: setCurrentPage,
          }}
        />
      </div>
    );
  },
};

// Responsive table
export const ResponsiveTable: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Custom row key
export const CustomRowKey: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    rowKey: 'email', // Use email as unique identifier
    selectable: true,
  },
};

// Table with custom cell rendering
export const CustomCellRendering: Story = {
  args: {
    data: sampleUsers,
    columns: [
      { key: 'id', title: 'ID', dataIndex: 'id', sortable: true, width: 80, align: 'center' },
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { 
        key: 'role', 
        title: 'Role', 
        dataIndex: 'role', 
        sortable: true,
        render: (value: string) => (
          <span style={{ 
            padding: '0.25rem 0.75rem', 
            borderRadius: '1rem', 
            fontSize: '0.75rem',
            backgroundColor: value === 'Admin' ? '#fee2e2' : 
                           value === 'Moderator' ? '#fef3c7' : '#dbeafe',
            color: value === 'Admin' ? '#dc2626' : 
                   value === 'Moderator' ? '#ca8a04' : '#1d4ed8'
          }}>
            {value}
          </span>
        )
      },
      { 
        key: 'lastLogin', 
        title: 'Last Login', 
        dataIndex: 'lastLogin', 
        sortable: true,
        render: (value: string) => {
          const date = new Date(value);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - date.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          return (
            <span style={{ 
              color: diffDays <= 1 ? '#166534' : diffDays <= 7 ? '#ca8a04' : '#6b7280'
            }}>
              {diffDays === 0 ? 'Today' : 
               diffDays === 1 ? 'Yesterday' : 
               `${diffDays} days ago`}
            </span>
          );
        }
      },
    ],
    selectable: true,
  },
};
