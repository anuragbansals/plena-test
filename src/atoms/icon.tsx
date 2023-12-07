import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ColorPalette} from '../constants/colors';

interface IProps {
  name?: string;
  size?: number;
  color?: string;
}

const CustomIcon = (props: IProps) => {
  const {color = ColorPalette.white, name, size = 30} = props;
  return <Icon name="add" size={size} color={color} />;
};

export default CustomIcon;

const styles = StyleSheet.create({});
