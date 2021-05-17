import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';

import shortid from 'shortid';
import ProductContext from '../context/product/ProductContext';

const Popup = ({
  modalVisible,
  setModalVisible,
  id,
  setId,
  price,
  setPrice,
  cant,
  setCant,
}) => {
  const {
    data,
    addProduct,
    updateProduct,
    storeData,
    formatterPeso,
  } = useContext(ProductContext);
  const [err, setErr] = useState(false);

  const getPrice = value => {
    setPrice(value);
  };
  const getCant = value => {
    setCant(value);
  };

  const saveProduct = () => {
    let product = {
      id: 0,
      price: 0,
      cant: 0,
    };

    if (price != '' && cant != '') {
      if (id != '') {
        product = {
          id: id,
          price: price,
          cant: cant,
        };
        updateProduct(product);
        storeData(data);
        setModalVisible(!modalVisible);
        setId('');
        return;
      }
      setModalVisible(!modalVisible);
      product = {
        id: shortid.generate(),
        price: price,
        cant: cant,
      };
      addProduct(product);
      storeData(data);
    } else {
      setErr(true);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ingresa Los valores</Text>
            <View style={styles.inLine}>
              <View>
                <Text style={{textAlign: 'center', marginBottom: 5}}>
                  Precio del producto
                </Text>
                <TextInput
                  placeholder="0"
                  style={styles.Input}
                  keyboardType="numeric"
                  onChangeText={value => getPrice(value)}
                  value={price}
                />
              </View>
              <View>
                <Text style={{textAlign: 'center', marginBottom: 5}}>
                  Cantidad
                </Text>
                <TextInput
                  placeholder="0"
                  style={styles.Input}
                  keyboardType="numeric"
                  onChangeText={value => getCant(value)}
                  value={cant.toString()}
                />
              </View>
            </View>
            {err ? (
              <View>
                <Text>Tienes algun campo vacio</Text>
              </View>
            ) : null}
            <View style={styles.inLine}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setErr(false);
                }}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={() => saveProduct()}>
                <Text style={styles.textStyle}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  between: {
    fontSize: 25,
    flex: 1,
    justifyContent: 'space-between',
  },
  modalView: {
    justifyContent: 'center',
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    width: 350,
    height: 250,
    // paddingVertical: 35,
    // paddingHorizontal: 100,
    alignItems: 'center',
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Input: {
    borderRadius: 5,
    borderWidth: 0.8,
    marginHorizontal: 10,
    marginBottom: 10,
    width: 150,
    textAlign: 'center',
    fontSize: 30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: '#ffd1c6',
  },
  buttonSave: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#212121',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 1,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
  },
  inLine: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Popup;
