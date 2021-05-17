import React, {useReducer} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';

import {
  BUDGET,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_BALANCE,
  CLEAN_DATA,
  SAVE_STORAGE,
} from '../../types/index';

const ProductState = props => {
  const initialState = {
    data: {
      budget: 0,
      balance: 0,
      products: [],
    },
  };

  const [state, dispach] = useReducer(ProductReducer, initialState);

  const addBudget = bud => {
    dispach({
      type: BUDGET,
      payload: bud,
    });
  };

  const addProduct = product => {
    dispach({
      type: ADD_PRODUCT,
      payload: product,
    });
  };

  const updateProduct = prod => {
    dispach({
      type: UPDATE_PRODUCT,
      payload: prod,
    });
  };

  const updateBalance = total => {
    dispach({
      type: UPDATE_BALANCE,
      payload: total,
    });
  };

  const cleanData = () => {
    dispach({
      type: CLEAN_DATA,
    });
  };

  const storeData = async data => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('productData', jsonData);
    } catch (e) {
      console.log(e);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('productData');
    } catch (e) {
      console.log(e);
    }

    console.log('Done.');
  };

  const formatterPeso = num => {
    let newValue;
    let format;
    if (typeof num === 'number') {
      return (format = new Intl.NumberFormat('es-CO').format(num));
    }
    newValue = parseInt(num.replace('.', ''));
    return (format = new Intl.NumberFormat('es-CO').format(num));
  };

  return (
    <ProductContext.Provider
      value={{
        data: state.data,
        addBudget,
        addProduct,
        updateProduct,
        updateBalance,
        cleanData,
        storeData,
        removeValue,
        formatterPeso,
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
