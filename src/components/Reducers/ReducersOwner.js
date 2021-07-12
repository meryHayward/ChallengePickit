export const INIT_OWNER = 'Inicializar';
export const EDIT_OWNER = 'EDITAR';
export const ELIMINAR_OWNER = 'Eliminar';
export const ADD_OWNER = 'Agregar';

export const ownerReducer = (state, action) => {
  switch (action.type) {
    case INIT_OWNER:
      return action.payload;
    case ADD_OWNER:
      return [...state, action.payload];
    case EDIT_OWNER:
      return state.map((owner) => {
        if (owner.name === action.payload.name) {
          owner.name = action.payload.name;
          owner.id = action.payload.id;
          owner.service = action.payload.service;
          owner.price = action.payload.price;
        }
        return owner;
      });
    case ELIMINAR_OWNER:
      console.log(action.payload.id, state);
      return state.filter((owner) => owner.id != action.payload.id);
    default:
      return state;
  }
};
