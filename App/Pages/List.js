import React, {useState, useContext, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Popup from '../components/Popup';
import ProductContext from '../context/product/ProductContext';

const List = ({navigation}) => {
  const {
    data,
    updateBalance,
    cleanData,
    removeValue,
    formatterPeso,
  } = useContext(ProductContext);
  const {budget, balance, products} = data;

  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [cant, setCant] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const updateItem = prod => {
    setId(prod.id);
    setPrice(prod.price.toString());
    setCant(prod.cant.toString());
    setModalVisible(true);
  };

  const addProduct = () => {
    setCant('');
    setPrice('');
    setModalVisible(true);
  };
  const calculateRest = () => {
    let total = 0;
    total = products.reduce(
      (newTotal, prod) => newTotal + parseInt(prod.price) * parseInt(prod.cant),
      0,
    );
    if (total != 0) updateBalance(total);
  };

  useEffect(() => {
    calculateRest();
  }, [products]);

  return (
    <View style={styles.flexOne}>
      <View style={styles.budget}>
        <Text style={styles.textBudget}>
          Presupuesto:{' '}
          {/* <Text style={{fontWeight: 'bold'}}>${formatterPeso(budget)}</Text> */}
          <Text style={{fontWeight: 'bold'}}>${budget}</Text>
        </Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.labelRest}>Cantidad restante:</Text>
      </View>
      <View style={[styles.backColor, styles.center, styles.balance]}>
        {/* <Text style={styles.rest}>${formatterPeso(balance)}</Text> */}
        <Text style={styles.rest}>${balance}</Text>
      </View>
      {/* <ScrollView style={styles.containerList}> */}
      <View style={[styles.inLine, styles.preCan]}>
        <Text style={[styles.labelPice]}>Precio</Text>
        <Text style={[styles.labelCant]}>Cantidad</Text>
        <Text style={[styles.labelCant]}>Editar</Text>
      </View>
      <ScrollView style={styles.containerList}>
        {products.map((prod, i) => {
          return (
            <View key={i} style={[styles.inLine]}>
              <View
                style={[
                  styles.labelContainerBackground,
                  styles.labelContainerPrice,
                ]}>
                <Text style={styles.labelList}>
                  {' '}
                  {/* $ {formatterPeso(prod.price)}{' '} */}$ {prod.price}{' '}
                </Text>
              </View>
              <View
                style={[
                  styles.labelContainerBackground,
                  styles.labelContainerCant,
                ]}>
                <Text style={styles.labelList}> {prod.cant} </Text>
              </View>
              <View style={[{width: 100, alignItems: 'center'}]}>
                <FontAwesome5
                  name={'edit'}
                  size={30}
                  color="#2196F3"
                  onPress={() => updateItem(prod)}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Popup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={id}
        setId={setId}
        price={price}
        setPrice={setPrice}
        cant={cant}
        setCant={setCant}
      />

      <View style={styles.addBtnContainer}>
        <TouchableHighlight
          style={styles.addBtn}
          underlayColor="#2196F3"
          onPress={() => addProduct()}>
          <Text style={styles.addtext}>Agregar Producto</Text>
        </TouchableHighlight>
      </View>
      <View style={[styles.center, styles.containerClean]}>
        <TouchableHighlight
          underlayColor="#ffff"
          onPress={() => {
            cleanData();
            removeValue();
            navigation.navigate('Comenzemos');
          }}>
          <Text style={{color: '#2196F3', fontSize: 20}}>Borrar lista</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
  },
  budget: {
    alignItems: 'center',
    marginVertical: 15,
    borderBottomColor: 'blue',
    borderBottomWidth: 1.5,
    paddingBottom: 5,
  },
  textBudget: {
    fontSize: 20,
  },
  containerList: {
    marginHorizontal: 20,
  },
  backColor: {
    backgroundColor: '#acd9bc',
    borderRadius: 510,
  },
  labelRest: {
    paddingBottom: 5,
  },
  rest: {
    fontSize: 40,
  },
  balance: {
    marginHorizontal: 50,
    marginBottom: 10,
  },
  addBtnContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  addBtn: {
    backgroundColor: 'blue',
    paddingVertical: 20,
    borderRadius: 10,
  },
  addtext: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#ffff',
  },
  inLine: {
    // flex: 1,
    flexDirection: 'row',
    alignContent: 'space-around',
  },
  preCan: {
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'blue',
  },
  labelContainerBackground: {
    backgroundColor: '#e3e4e5',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
  },
  labelList: {
    textAlign: 'center',
    fontSize: 28,
  },
  labelContainerPrice: {
    width: 200,
    marginRight: 10,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  labelContainerCant: {
    width: 50,
    alignItems: 'center',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  labelPice: {
    fontSize: 20,
    width: 200,
    textAlign: 'center',
  },
  labelCant: {
    fontSize: 20,
    marginLeft: 10,
  },
  containerClean: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default List;
