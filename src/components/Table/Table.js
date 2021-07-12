import React from 'react';
import './Table.scss';

const Table = ({ headers, children }) => {
  return (
    <>
      <h2 className="titulo">Tabla Vehiculos</h2>
      <table className="table">
        <thead>
          {headers.map((header) => {
            return <th>{header}</th>;
          })}
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

export default Table;
