import React from 'react';
import './Table2.scss';

const Table2 = ({ headers2, children }) => {
  return (
    <>
      <h2 className="titulo">Tabla Dueños de Vehiculos</h2>
      <table className="table">
        <thead>
          {headers2.map((header2) => {
            return <th>{header2}</th>;
          })}
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

export default Table2;
