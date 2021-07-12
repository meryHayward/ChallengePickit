import React, { useState, useEffect } from 'react';
import './NewOwnerModal.scss';
import Modal from '../Modal/Modal';
import axios from 'axios';

const NewOwnerModal = ({ close, ownerDispatch, actionType, owners }) => {
  const [newName, setNewName] = useState('');
  const [newOwnerId, setNewOwnerId] = useState('');

  const changeOwnerName = (event) => setNewName(event.target.value);
  const changeOwnerId = (event) => setNewOwnerId(event.target.value);

  const saveOwner = () => {
    const newOwner = {
      id: newOwnerId,
      name: newName,
    };

    axios
      .post(
        `https://60e4a82a5bcbca001749eb58.mockapi.io/api/v1/owner`,
        newOwner
      )
      .then((res) => {
        ownerDispatch({ type: actionType, payload: res.data });
        close();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal title="New User" close={close}>
      <form key={changeOwnerId}>
        <input type="text" defaultValue="Nombre" onChange={changeOwnerName} />
        <button type="button" onClick={saveOwner}>
          Save
        </button>
      </form>
    </Modal>
  );
};

export default NewOwnerModal;
