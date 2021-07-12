export const INIT = 'Inicializar';
export const ADD = 'Agregar';
export const EDIT = 'EDITAR';
export const ELIMINAR = 'Eliminar';

export const reducer = (state, action) => {
  switch (action.type) {
    case INIT:
      return action.payload;
    case ADD:
      return [...state, action.payload];
    case EDIT:
      return state.map((car) => {
        if (car.id === action.payload.id) {
          car.marca = action.payload.marca;
          car.patente = action.payload.patente;
          car.color = action.payload.color;
          car.year = action.payload.year;
          car.ownerId = action.payload.ownerId;
        }
        return car;
      });
    case ELIMINAR:
      return state.filter((car) => car.id !== action.payload.id);
    default:
      return state;
  }
};
