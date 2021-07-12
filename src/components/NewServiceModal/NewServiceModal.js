import React, { useState, useEffect } from 'react';
import '../Modal/Modal.scss';
import services from './services';
import axios from 'axios';

const NewServiceModal = ({ close, owners, dispatch, actionType, owner }) => {
  const [service, setService] = useState('Cambio de Aceite');
  const [price, setPrice] = useState('$5000');
  const [newOwnerId, setNewOwnerId] = useState('');

  const changeName = (event) => {
    setNewOwnerId(event.target.value);
  };

  /*   const changeName = (event) => {
    setNewName(event.target.value);
  }; */

  const save = () => {
    const newOwner = {
      ...owners.find((owner) => owner.id == newOwnerId),
      service: service,
      price: price,
    };

    axios
      .put(
        `https://60e4a82a5bcbca001749eb58.mockapi.io/api/v1/owner/${newOwner.id}`,
        newOwner
      )
      .then((res) => {
        dispatch({ type: actionType, payload: newOwner });
        close();
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="overlay"></div>
      <section className="modal">
        <header>
          <h2>Servicios</h2>
          <button type="button" onClick={close}>
            X
          </button>
        </header>
        <article className="modal-content">
          <div className="modal-content">
            {services.map((s) => (
              <>
                <div>
                  <input
                    key={s.id}
                    type="radio"
                    name="service"
                    value={s.id}
                    checked={service === s.service}
                    onChange={() => {
                      setService(s.service);
                      setPrice(s.price);
                    }}
                  />
                  {s.service}
                </div>
              </>
            ))}
            <h1>
              {service}={price}
            </h1>
          </div>
          <select defaultValue="-1" onChange={changeName}>
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
        </article>
      </section>
    </React.Fragment>
  );
};

export default NewServiceModal;
