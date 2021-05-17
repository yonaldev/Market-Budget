import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

import ProductContext from '../context/product/ProductContext';

const Inicio = ({navigation}) => {
  const {data, addBudget, storeData, formatterPeso} = useContext(
    ProductContext,
  );
  const [err, setErr] = useState(false);
  const [minValue, setminValue] = useState(false);
  const [budg, setbudg] = useState('');
  const [numFormat, setnumFormat] = useState('0');

  const getValue = value => {
    setbudg(value);
    // let newValue = parseInt(value.replace('.', ''));
    // setbudg(newValue);
  };

  const format = value => {
    if (value === '') value = '0';
    setnumFormat(formatterPeso(value));
  };

  const buy = () => {
    if (!budg) {
      setminValue(false);
      return setErr(true);
    }
    if (budg < 10000) {
      setErr(false);
      return setminValue(true);
    }
    addBudget(budg);
    storeData(data);
    navigation.navigate('Listado de productos');
    setErr(false);
    setminValue(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{marginBottom: 40}}>
          <Image source={require('../assets/icons/logo.png')} />
        </View>
        <Text style={styles.title}>Presupuesto</Text>
        <Text style={{fontSize: 20}}>
          Ingrese la cantidad de dinero disponible
        </Text>
        {err ? (
          <View>
            <Text>Debes ingresar un valor para iniciar</Text>
          </View>
        ) : null}
        {minValue ? (
          <View>
            <Text>
              Debes ingresar un valor minimo de{' '}
              <Text style={{fontWeight: 'bold'}}>$10.000</Text>
            </Text>
          </View>
        ) : null}
        <TextInput
          placeholder="0"
          style={styles.inpunt}
          keyboardType="numeric"
          maxLength={12}
          onChangeText={value => {
            getValue(value);
            // format(value);
          }}
          value={budg}
          // value={numFormat}
        />
        <TouchableHighlight
          style={styles.btn}
          onPress={() => buy()}
          underlayColor="#61E8C9">
          <Text style={styles.textBtn}>Comenzar con las compras</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#82c59c',
  },
  btn: {
    backgroundColor: '#82c59c',
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textBtn: {
    fontSize: 25,
  },
  inpunt: {
    borderBottomColor: '#5BC5F5',
    borderBottomWidth: 1.5,
    marginBottom: 30,
    fontSize: 30,
    textAlign: 'center',
    height: 100,
    width: 200,
  },
});

export default Inicio;
