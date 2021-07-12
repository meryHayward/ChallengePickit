import React, { useState, useEffect, useReducer } from 'react';
import OwnerModal from './components/OwnerModal/OwnerModal';
import NewUserModal from './components/NewUserModal/NewUserModal';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faWrench,
  faEdit,
  faCar,
} from '@fortawesome/free-solid-svg-icons';
import Table from './components/Table/Table';
import Table2 from './components/Table2/Table2';
import ContentContainer from './components/ContentContainer/ContentContainer';
import axios from 'axios';
import NewOwnerModal from './components/NewOwnerModal/NewOwnerModal';
import CarModal from './components/CarModal/CarModal';
import NewServiceModal from './components/NewServiceModal/NewServiceModal';
import {
  reducer,
  INIT,
  ADD,
  ELIMINAR,
  EDIT,
} from './components/Reducers/ReducersCar';
import {
  ownerReducer,
  INIT_OWNER,
  ADD_OWNER,
  EDIT_OWNER,
  ELIMINAR_OWNER,
} from './components/Reducers/ReducersOwner';

const App = () => {
  const [cars, dispatch] = useReducer(reducer, []);
  const [owners, ownerDispatch] = useReducer(ownerReducer, []);
  const [selectedCar, setSelectedCar] = useState();
  const [selectedOwner, setSelectedOwner] = useState();
  const [displayNewCar, setDisplayNewCar] = useState(false);
  const [displayCarModal, setDisplayCarModal] = useState(false);
  const [displayOwnerModal, setDisplayOwnerModal] = useState(false);
  const [displayNewOwnerModal, setDisplayNewOwnerModal] = useState(false);
  const [displayServiceModal, setDisplayServiceModal] = useState(false);

  const headers = ['Marca', 'Patente', 'Color', 'Año', 'Dueño'];
  const headers2 = ['Nombre Completo', 'Id', 'Servicio', 'Precio'];

  const getData2 = async (url, dispatch, actionType) => {
    try {
      const res = await axios.get(url);
      dispatch({ type: actionType, payload: res.data });
    } catch (err) {
      alert('Error getting data', err);
    }
  };

  const getCars = async () =>
    getData2(
      'https://60e4a82a5bcbca001749eb58.mockapi.io/api/v1/car',
      dispatch,
      INIT
    );
  const getOwner = async () =>
    getData2(
      'https://60e4a82a5bcbca001749eb58.mockapi.io/api/v1/owner',
      ownerDispatch,
      INIT_OWNER
    );

  const editCar = (car) => {
    setSelectedCar(car);
    setDisplayCarModal(true);
  };

  const editOwner = (owner) => {
    setSelectedOwner(owner);
    setDisplayOwnerModal(true);
  };

  const deleteCar = (car) => {
    axios
      .delete(
        `https://60e4a82a5bcbca001749eb58.mockapi.io/api/v1/car/${car.id}`
      )
      .then((res) => {
        dispatch({ type: ELIMINAR, payload: res.data });
      })
      .catch((err) => console.warn('err'));
  };

  const deleteOwner = (owner) => {
    console.log('Ver', owner.id);
    axios
      .delete(
        `https://60e4a82a5bcbca001749eb58.mockapi.io/api/v1/owner/${owner.id}`
      )
      .then((res) => {
        console.log('ver', res.data);
        ownerDispatch({ type: ELIMINAR_OWNER, payload: res.data });
      })
      .catch((err) => console.warn('err'));
  };

  useEffect(() => getCars(), []);
  useEffect(() => getOwner(), []);

  return (
    <React.Fragment>
      <header className="main-header">
        <h1>CAR SERVICES</h1>
      </header>
      <button
        className="button-green"
        type="button"
        onClick={() => setDisplayNewCar(true)}
        style={{ marginLeft: `25px`, position: 'fixed' }}
      >
        CARGAR VEHICULO
        <FontAwesomeIcon icon={faCar} style={{ marginLeft: `5px` }} />
      </button>
      <button
        className="button-green"
        type="button"
        onClick={() => setDisplayNewOwnerModal(true)}
        style={{ marginLeft: `25px`, marginTop: '50px', position: 'fixed' }}
      >
        CARGAR USUARIO
        <FontAwesomeIcon icon={faUserPlus} style={{ marginLeft: `5px` }} />
      </button>
      <button
        className="button-green"
        type="button"
        onClick={() => setDisplayServiceModal(true)}
        style={{ marginLeft: `25px`, marginTop: '100px', position: 'fixed' }}
      >
        SERVICIOS
        <FontAwesomeIcon icon={faWrench} style={{ marginLeft: `5px` }} />
      </button>
      {displayNewCar ? (
        <NewUserModal
          owners={owners}
          close={() => setDisplayNewCar(false)}
          cars={cars}
          dispatch={dispatch}
          actionType={ADD}
        />
      ) : null}
      {displayNewOwnerModal ? (
        <NewOwnerModal
          owners={owners}
          close={() => setDisplayNewOwnerModal(false)}
          ownerDispatch={ownerDispatch}
          actionType={ADD_OWNER}
        />
      ) : null}
      {displayCarModal ? (
        <CarModal
          car={selectedCar}
          owners={owners}
          close={() => setDisplayCarModal(false)}
          cars={cars}
          dispatch={dispatch}
          actionType={EDIT}
        />
      ) : null}
      {displayServiceModal ? (
        <NewServiceModal
          close={() => setDisplayServiceModal(false)}
          owners={owners}
          dispatch={ownerDispatch}
          actionType={EDIT_OWNER}
          owner={selectedOwner}
        />
      ) : null}
      {displayOwnerModal ? (
        <OwnerModal
          owner={selectedOwner}
          close={() => setDisplayOwnerModal(false)}
          owners={owners}
          ownerDispatch={ownerDispatch}
          actionType={EDIT}
        />
      ) : null}
      <ContentContainer>
        <Table headers={headers}>
          {cars.map((car) => {
            const owner = owners.find((owner) => owner.id == car.ownerId) || {
              name: 'Not Found',
            };
            return (
              <tr key={car.id}>
                <td>{car.marca}</td>
                <td>{car.patente}</td>
                <td>{car.color}</td>
                <td>{car.year}</td>
                <td>{owner.name}</td>
                <td>
                  <button className="button-green" onClick={() => editCar(car)}>
                    EDIT
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ marginLeft: `5px` }}
                    />
                  </button>
                  <button
                    className="button-green"
                    onClick={() => deleteCar(car)}
                  >
                    DELETE
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ marginLeft: `5px` }}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </Table>
      </ContentContainer>
      <ContentContainer>
        <Table2 headers2={headers2}>
          {owners.map((owner) => {
            return (
              <tr key={owner.id}>
                <td>{owner.name}</td>
                <td>{owner.id}</td>
                <td>{owner.service}</td>
                <td>{owner.price}</td>
                <td>
                  <button
                    className="button-green"
                    onClick={() => editOwner(owner)}
                  >
                    EDIT
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ marginLeft: `5px` }}
                    />
                  </button>
                  <button
                    className="button-green"
                    onClick={() => deleteOwner(owner)}
                  >
                    DELETE
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ marginLeft: `5px` }}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </Table2>
      </ContentContainer>
    </React.Fragment>
  );
};

export default App;
