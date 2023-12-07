import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ColorPalette} from '../constants/colors';
import {ProductItem} from '../redux/productSlice';

interface IProps {
  imageUrl?: string;
  price?: number;
  name?: string;
  item?: ProductItem;
  onPress: Function;
  handleProduct: Function;
}

const ProdItem = (props: IProps) => {
  const {imageUrl, name, price, item, onPress, handleProduct} = props;
  return (
    <TouchableOpacity
      onPress={() => handleProduct(item?.id)}
      style={styles.container}>
      <Image resizeMode="cover" style={styles.image} source={{uri: imageUrl}} />
      <View style={styles.lowerContainer}>
        <Text style={styles.text}>Rs {price}</Text>
        <TouchableOpacity
          onPress={() => onPress(item, item?.addedToCart ? false : true)}
          style={styles.icon}>
          <Text style={{fontSize: 20}}> {item?.addedToCart ? '-' : '+'}</Text>
          {/* <CustomIcon size={16} color={ColorPalette.white} /> */}
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ProdItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginVertical: 8,
    paddingHorizontal: 4,
    maxWidth: 180,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  text: {
    color: ColorPalette.black,
    maxWidth: 80,
  },
  lowerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: 'blue',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
