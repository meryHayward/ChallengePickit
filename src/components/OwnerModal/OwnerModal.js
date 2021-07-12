import React, { useState } from 'react';
import './OwnerModal.scss';
import Modal from '../Modal/Modal';
import axios from 'axios';

const JobModal = ({ owner, close, ownerDispatch, actionType }) => {
  const [newOwnerName, setNewOwnerName] = useState(owner.name);

  const changeName = (event) => setNewOwnerName(event.target.value);
  const save = () => {
    const newOwner = {
      ...owner,
      name: newOwnerName,
    };

    axios
      .put(
        `https://60e4a82a5bcbca001749eb58.mockapi.io/api/v1/owner/${newOwner.id}`,
        newOwner
      )
      .then((res) => {
        ownerDispatch({ type: actionType, payload: newOwner });
        close();
      })
      .catch((err) => alert('ERROR!'));
  };

  return (
    <Modal title={`Editar Usuario`} close={close}>
      <form>
        <input type="text" defaultValue={owner.name} onChange={changeName} />
        <button type="button" onClick={save}>
          Save
        </button>
      </form>
    </Modal>
  );
};
export default JobModal;
