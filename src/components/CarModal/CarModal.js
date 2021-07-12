import React, { useState } from 'react';
import './CarModal.scss';
import Modal from '../Modal/Modal';
import axios from 'axios';

const UserModal = ({ car, owners, close, cars, dispatch, actionType }) => {
  const [newMarca, setNewMarca] = useState(car.marca);
  const [newOwnerId, setNewOwnerId] = useState(car.ownerId);
  const [newPatente, setNewPatente] = useState(car.patente);
  const [newColor, setNewColor] = useState(car.color);
  const [newYear, setNewYear] = useState(car.year);

  const changeMarca = (event) => setNewMarca(event.target.value);
  const changeOwnerId = (event) => setNewOwnerId(event.target.value);
  const changePatente = (event) => setNewPatente(event.target.value);
  const changeColor = (event) => setNewColor(event.target.value);
  const changeYear = (event) => setNewYear(event.target.value);

  const save = () => {
    const newCar = {
      ...car,
      ownerId: newOwnerId,
      marca: newMarca,
      patente: newPatente,
      color: newColor,
      year: newYear,
    };

    axios
      .put(
        `https://60e4a82a5bcbca001749eb58.mockapi.io/api/v1/car/${newCar.id}`,
        newCar
      )
      .then((res) => {
        dispatch({ type: actionType, payload: newCar });
        close();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal title={`Edit User ${car.name}`} close={close}>
      <h3>Add new car</h3>
      <form>
        <input type="text" defaultValue={car.marca} onChange={changeMarca} />
        <input
          type="text"
          defaultValue={car.patente}
          onChange={changePatente}
        />
        <input type="text" defaultValue={car.color} onChange={changeColor} />
        <input type="text" defaultValue={car.year} onChange={changeYear} />
        <select defaultValue={car.OwnerId} onChange={changeOwnerId}>
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

export default UserModal;
