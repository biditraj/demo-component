import React, { useState } from 'react';
import { InputField } from './components/InputField';
import { DataTable, type Column } from './components/DataTable';
import './App.css';

// Sample data for DataTable
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'active', lastLogin: '2024-01-13' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', lastLogin: '2024-01-12' },
];

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

function App() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const total = sampleUsers.length;
  
  const paginatedData = sampleUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Components Demo</h1>
        <p>Showcasing InputField and DataTable components built with TypeScript and modern patterns</p>
      </header>

      <main className="app-main">
        {/* InputField Section */}
        <section className="component-section">
          <h2>InputField Component</h2>
          <p>A flexible input component with validation states, multiple variants, and accessibility features.</p>
          
          <div className="input-examples">
            <div className="input-group">
              <h3>Basic Examples</h3>
              <InputField
                label="Email Address"
                placeholder="Enter your email"
                helperText="We'll never share your email with anyone else."
              />
              
              <InputField
                label="Password"
                placeholder="Enter your password"
                passwordToggle
                type="password"
              />
              
              <InputField
                label="Username"
                placeholder="Choose a username"
                clearable
                helperText="Must be at least 3 characters long"
              />
            </div>

            <div className="input-group">
              <h3>Variants & Sizes</h3>
              <InputField
                label="Filled Input (Large)"
                placeholder="Filled variant, large size"
                variant="filled"
                size="lg"
              />
              
              <InputField
                label="Ghost Input (Small)"
                placeholder="Ghost variant, small size"
                variant="ghost"
                size="sm"
              />
            </div>

            <div className="input-group">
              <h3>States & Validation</h3>
              <InputField
                label="Valid Input"
                placeholder="This input is valid"
                helperText="Great! This looks good."
              />
              
              <InputField
                label="Invalid Input"
                placeholder="This input has an error"
                invalid
                errorMessage="This field is required"
              />
              
              <InputField
                label="Loading Input"
                placeholder="Loading..."
                loading
              />
              
              <InputField
                label="Disabled Input"
                placeholder="This input is disabled"
                disabled
                helperText="This field cannot be edited"
              />
            </div>

            <div className="input-group">
              <h3>Advanced Features</h3>
              <InputField
                label="Password with Clear"
                placeholder="Enter password"
                passwordToggle
                clearable
                value="secret123"
              />
              
              <InputField
                label="Dark Theme Input"
                placeholder="Dark themed input"
                theme="dark"
                variant="filled"
              />
            </div>
          </div>
        </section>

        {/* DataTable Section */}
        <section className="component-section">
          <h2>DataTable Component</h2>
          <p>A feature-rich data table with sorting, row selection, pagination, and responsive design.</p>
          
          <div className="table-examples">
            <div className="table-info">
              <h3>User Management Table</h3>
              <p>Selected Users: {selectedUsers.length}</p>
              {selectedUsers.length > 0 && (
                <ul className="selected-users">
                  {selectedUsers.map(user => (
                    <li key={user.id}>
                      <strong>{user.name}</strong> ({user.email}) - {user.role}
                    </li>
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
        </section>

        {/* Features Section */}
        <section className="component-section">
          <h2>Component Features</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎨 Design System</h3>
              <ul>
                <li>Multiple visual variants (filled, outlined, ghost)</li>
                <li>Three size options (small, medium, large)</li>
                <li>Light and dark theme support</li>
                <li>Responsive design for all screen sizes</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <h3>♿ Accessibility</h3>
              <ul>
                <li>ARIA labels and descriptions</li>
                <li>Keyboard navigation support</li>
                <li>Screen reader friendly</li>
                <li>High contrast mode support</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <h3>🔧 Functionality</h3>
              <ul>
                <li>Form validation states</li>
                <li>Loading and disabled states</li>
                <li>Clear button and password toggle</li>
                <li>Sorting and row selection</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <h3>📱 Modern Patterns</h3>
              <ul>
                <li>TypeScript with strict typing</li>
                <li>React hooks and functional components</li>
                <li>CSS custom properties</li>
                <li>Storybook documentation</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React, TypeScript, and modern web development patterns</p>
        <p>Components are fully documented with Storybook and include comprehensive examples</p>
      </footer>
    </div>
  );
}

export default App;
