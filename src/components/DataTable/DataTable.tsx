import React, { useState, useMemo, useCallback } from 'react';
import './DataTable.css';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyText?: string;
  className?: string;
  rowKey?: keyof T | ((record: T) => string);
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

export interface SortState {
  key: string;
  direction: 'asc' | 'desc';
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyText = 'No data available',
  className = '',
  rowKey,
  pagination
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Generate unique row keys
  const getRowKey = useCallback((record: T, index: number): string => {
    if (rowKey) {
      if (typeof rowKey === 'function') {
        return rowKey(record);
      }
      return String(record[rowKey]);
    }
    return String(index);
  }, [rowKey]);

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortState) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortState.key];
      const bValue = b[sortState.key];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortState]);

  // Handle column sorting
  const handleSort = useCallback((column: Column<T>) => {
    if (!column.sortable) return;

    setSortState(prev => {
      if (!prev || prev.key !== column.key) {
        return { key: column.key, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key: column.key, direction: 'desc' };
      }
      return null;
    });
  }, []);

  // Handle row selection
  const handleRowSelect = useCallback((rowKey: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(rowKey);
    } else {
      newSelectedRows.delete(rowKey);
    }
    setSelectedRows(newSelectedRows);
    
    // Update select all state
    setSelectAll(newSelectedRows.size === sortedData.length);
    
    // Call onRowSelect callback
    if (onRowSelect) {
      const selectedData = sortedData.filter((record, index) => 
        newSelectedRows.has(getRowKey(record, index))
      );
      onRowSelect(selectedData);
    }
  }, [selectedRows, sortedData, onRowSelect, getRowKey]);

  // Handle select all
  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      const allRowKeys = sortedData.map((record, index) => getRowKey(record, index));
      setSelectedRows(new Set(allRowKeys));
      setSelectAll(true);
      onRowSelect?.(sortedData);
    } else {
      setSelectedRows(new Set());
      setSelectAll(false);
      onRowSelect?.([]);
    }
  }, [sortedData, onRowSelect, getRowKey]);

  // Get sort icon for column header
  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;
    
    if (!sortState || sortState.key !== column.key) {
      return <span className="data-table__sort-icon">↕</span>;
    }
    
    return sortState.direction === 'asc' 
      ? <span className="data-table__sort-icon data-table__sort-icon--asc">↑</span>
      : <span className="data-table__sort-icon data-table__sort-icon--desc">↓</span>;
  };

  // Render cell content
  const renderCell = (column: Column<T>, record: T, index: number) => {
    const value = record[column.dataIndex];
    
    if (column.render) {
      return column.render(value, record, index);
    }
    
    return value != null ? String(value) : '';
  };

  if (loading) {
    return (
      <div className={`data-table data-table--loading ${className}`}>
        <div className="data-table__loading">
          <div className="data-table__spinner"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`data-table data-table--empty ${className}`}>
        <div className="data-table__empty">
          <span>{emptyText}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`data-table ${className}`}>
      <div className="data-table__container">
        <table className="data-table__table">
          <thead className="data-table__thead">
            <tr className="data-table__tr">
              {selectable && (
                <th className="data-table__th data-table__th--checkbox">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="data-table__checkbox"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`data-table__th ${
                    column.sortable ? 'data-table__th--sortable' : ''
                  }`}
                  style={{ width: column.width, textAlign: column.align }}
                  onClick={() => handleSort(column)}
                >
                  <div className="data-table__header-content">
                    <span>{column.title}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="data-table__tbody">
            {sortedData.map((record, index) => {
              const rowKey = getRowKey(record, index);
              const isSelected = selectedRows.has(rowKey);
              
              return (
                <tr
                  key={rowKey}
                  className={`data-table__tr ${
                    isSelected ? 'data-table__tr--selected' : ''
                  }`}
                >
                  {selectable && (
                    <td className="data-table__td data-table__td--checkbox">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleRowSelect(rowKey, e.target.checked)}
                        className="data-table__checkbox"
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="data-table__td"
                      style={{ textAlign: column.align }}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="data-table__pagination">
          <div className="data-table__pagination-info">
            Showing {((pagination.current - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} entries
          </div>
          <div className="data-table__pagination-controls">
            <button
              className="data-table__pagination-btn"
              disabled={pagination.current === 1}
              onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
            >
              Previous
            </button>
            <span className="data-table__pagination-current">
              Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <button
              className="data-table__pagination-btn"
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
