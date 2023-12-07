import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {ColorPalette} from '../constants/colors';

interface IProps {
  onPress: () => void;
  title: string;
  buttonStyles?: ViewStyle;
  isDisable?: boolean;
  titleStyle?: TextStyle;
}

const CustomButton = (props: IProps) => {
  const {onPress, title, buttonStyles, isDisable = false, titleStyle} = props;
  return (
    <TouchableOpacity
      disabled={isDisable}
      onPress={onPress}
      style={[styles.container, buttonStyles]}>
      <Text style={[styles.btnText, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.grey,
    width: '100%',
  },
  btnText: {
    textAlign: 'center',
    color: ColorPalette.black,
  },
});
