import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable, type Column } from './DataTable';

interface TestData {
  id: number;
  name: string;
  email: string;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const testColumns: Column<TestData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
];

describe('DataTable Component', () => {
  test('renders table with data', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  test('renders column headers', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(<DataTable data={[]} columns={testColumns} loading />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows empty state', () => {
    render(<DataTable data={[]} columns={testColumns} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('renders checkboxes when selectable is true', () => {
    render(<DataTable data={testData} columns={testColumns} selectable />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(testData.length + 1); // +1 for select all
  });

  test('calls onRowSelect when row is selected', () => {
    const handleRowSelect = jest.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
        onRowSelect={handleRowSelect}
      />
    );
    
    const firstRowCheckbox = screen.getAllByRole('checkbox')[1]; // Skip select all
    fireEvent.click(firstRowCheckbox);
    
    // The callback should be called with the selected row
    expect(handleRowSelect).toHaveBeenCalledTimes(1);
    const callArgs = handleRowSelect.mock.calls[0][0];
    expect(callArgs).toHaveLength(1);
    expect(callArgs[0]).toEqual(testData[0]);
  });

  test('selects all rows when select all is clicked', () => {
    const handleRowSelect = jest.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
        onRowSelect={handleRowSelect}
      />
    );
    
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(selectAllCheckbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith(testData);
  });

  test('renders pagination when provided', () => {
    const pagination = {
      current: 1,
      pageSize: 1,
      total: 2,
      onChange: jest.fn(),
    };
    
    render(
      <DataTable 
        data={[testData[0]]} 
        columns={testColumns} 
        pagination={pagination}
      />
    );
    
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('applies custom empty text', () => {
    const customEmptyText = 'No records found';
    render(
      <DataTable 
        data={[]} 
        columns={testColumns} 
        emptyText={customEmptyText}
      />
    );
    
    expect(screen.getByText(customEmptyText)).toBeInTheDocument();
  });

  test('renders custom cell content when render function is provided', () => {
    const columnsWithRender: Column<TestData>[] = [
      { key: 'id', title: 'ID', dataIndex: 'id' },
      { 
        key: 'name', 
        title: 'Name', 
        dataIndex: 'name',
        render: (value) => <strong>{value.toUpperCase()}</strong>
      },
      { key: 'email', title: 'Email', dataIndex: 'email' },
    ];
    
    render(<DataTable data={testData} columns={columnsWithRender} />);
    
    expect(screen.getByText('JOHN DOE')).toBeInTheDocument();
    expect(screen.getByText('JANE SMITH')).toBeInTheDocument();
  });

  test('applies custom alignment to columns', () => {
    const columnsWithAlign: Column<TestData>[] = [
      { key: 'id', title: 'ID', dataIndex: 'id', align: 'center' },
      { key: 'name', title: 'Name', dataIndex: 'name', align: 'left' },
      { key: 'email', title: 'Email', dataIndex: 'email', align: 'right' },
    ];
    
    const { container } = render(
      <DataTable data={testData} columns={columnsWithAlign} />
    );
    
    const cells = container.querySelectorAll('.data-table__td');
    expect(cells[0]).toHaveStyle({ textAlign: 'center' });
    expect(cells[1]).toHaveStyle({ textAlign: 'left' });
    expect(cells[2]).toHaveStyle({ textAlign: 'right' });
  });
});
