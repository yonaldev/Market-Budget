import {
  BUDGET,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_BALANCE,
  CLEAN_DATA,
} from '../../types/index';

export default (state, action) => {
  switch (action.type) {
    case BUDGET:
      return {
        ...state,
        data: {...state.data, balance: action.payload, budget: action.payload},
      };
    case ADD_PRODUCT:
      return {
        ...state,
        data: {
          ...state.data,
          products: [...state.data.products, action.payload],
        },
      };
    case UPDATE_PRODUCT:
      state.data.products.find(prod => {
        if (prod.id === action.payload.id) {
          (prod.price = action.payload.price),
            (prod.cant = action.payload.cant);
        }
      });

      return {
        ...state,
        data: {
          ...state.data,
          products: [...state.data.products],
        },
      };

    case UPDATE_BALANCE:
      let min = 0;
      let max = 0;
      max = ((state.data.budget * 0.2) / 100) * 100;
      min = ((state.data.budget * 0.1) / 100) * 100;
      if (state.data.balance >= min && state.data.balance <= max) {
        alert('Estas por debajo del 20% de tu presupuesto inicial');
      }
      return {
        ...state,
        data: {
          ...state.data,
          balance: state.data.budget - action.payload,
        },
      };

    case CLEAN_DATA:
      return (state = {
        data: {
          budget: 0,
          balance: 0,
          products: [],
        },
      });

    default:
      return state;
  }
};
