import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Textfield = props => {
  const [pass, setIspass] = useState(props.isPassword);
  return (
    <View style={styles.container}>
      <TextInput
        maxLength={50}
        value={props.value}
        placeholder={props.placeholder}
        style={styles.input}
        secureTextEntry={pass}
        onChangeText={props.onChangeText}
      />
      {props.isRightIcon && (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => setIspass(!pass)}>
          <FontAwesome5 name={'eye'} size={18} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Textfield;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3e1e1',
    width: '90%',
    height: 40,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    width: '80%',
    marginLeft: 10,
  },
  rightIcon: {
    marginRight: '5%',
  },
});
