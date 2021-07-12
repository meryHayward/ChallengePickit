import React, { useState } from 'react';
import './NewUserModal.scss';
import Modal from '../Modal/Modal';
import axios from 'axios';

const NewUserModal = ({ owners, close, dispatch, actionType }) => {
  const [newCar, setNewCar] = useState('');
  const [newMarca, setNewMarca] = useState('');
  const [newOwnerId, setNewOwnerId] = useState('');
  const [newPatente, setNewPatente] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newYear, setNewYear] = useState('');

  const changeCar = (event) => setNewCar(event.target.value);
  const changeMarca = (event) => setNewMarca(event.target.value);
  const changeOwnerId = (event) => setNewOwnerId(event.target.value);
  const changePatente = (event) => setNewPatente(event.target.value);
  const changeColor = (event) => setNewColor(event.target.value);
  const changeYear = (event) => setNewYear(event.target.value);

  const save = () => {
    const newCar = {
      ownerId: newOwnerId,
      marca: newMarca,
      patente: newPatente,
      color: newColor,
      year: newYear,
    };

    axios
      .post(`https://60e4a82a5bcbca001749eb58.mockapi.io/api/v1/car`, newCar)
      .then((res) => {
        dispatch({ type: actionType, payload: res.data });
        close();
      })
      .catch((err) => alert('ERROR!'));
  };

  return (
    <Modal title="New Car" close={close}>
      <form>
        <input type="text" defaultValue="Marca" onChange={changeMarca} />
        <input type="text" defaultValue="Patente" onChange={changePatente} />
        <input type="text" defaultValue="Color" onChange={changeColor} />
        <input type="text" defaultValue="Year" onChange={changeYear} />
        <select defaultValue="-1" onChange={changeOwnerId}>
          <option value="-1" disabled selected>
            Elegir Usuario
          </option>
          {owners.map((owner) => {
            return <option value={owner.id}>{owner.name}</option>;
          })}
        </select>
        <button type="button" onClick={save}>
          Save
        </button>
      </form>
    </Modal>
  );
};

export default NewUserModal;
