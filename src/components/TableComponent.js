import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TableComponent = ({ data, columns, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-warning">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.key}>{item[col.key]}</td>
              ))}
              <td>
                <button className="btn btn-primary me-2" onClick={() => onEdit(item)}>
                  <FaEdit />
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(item)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success mt-3">Agregar nuevo</button>
    </div>
  );
};

export default TableComponent;