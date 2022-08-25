import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Textfield from '../components/Textfield';

let tokens =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZmY2RkZDU2NjJiNTA3Y2IyMDljZjFlNTIxOWVlNTc0NTk0MzkwMjE2NWE1Zjg0ZTdlNWUzNDhhMjFlYmRjMDQwOTcyMDgyNDQ4OTRlMWI3In0.eyJhdWQiOiIxIiwianRpIjoiZmZjZGRkNTY2MmI1MDdjYjIwOWNmMWU1MjE5ZWU1NzQ1OTQzOTAyMTY1YTVmODRlN2U1ZTM0OGEyMWViZGMwNDA5NzIwODI0NDg5NGUxYjciLCJpYXQiOjE2Mjc4OTI5NDksIm5iZiI6MTYyNzg5Mjk0OSwiZXhwIjoxNjU5NDI4OTQ5LCJzdWIiOiIxMzAzMiIsInNjb3BlcyI6W119.TJZ-Ygs8qKzgJNuif20KVyo8c6TF6JOBJkTTuYShbLLf4jmZg1BX6a9q0V69JkpV35VmT2kOJ5jRBPzz3Z6GmZuVAlbcNgwWHIIMRfO5WsRfhsKV2BiU3biELYIAMz49tG0R_xscQ5mY2VoSZClulRplnrwMiuyjn-K8BToJozfVKpz-VX-zhVfv5n5aNYB6MxrRJyPUXGMrITM7XEzO_iBjL9SgEKS-LkbVdf1ExkHGXGp6xw6ALZH3KpKV69hiaeDuFwwSSOhRUFg_BTuSGgoYhvwj2O7rUamRYuoVFTuRraqmOErN3oaq8SQHwWffSpH7YJtTJz86Yxnpmp7b5kZOzom9YAAeJas8_OqFGuUI9r2wPpJjWaDFu5SxYhcPAqGNTsVNzzyG4rLHPzq9eFnEfT5Uwwj-krQtlR4gKP_Z7RbgjOTPnXeEae0x9BpCzrMV0eE73iNIKpwt9jPGFa-PMMfMvom8YYb9VL0y4dSTKgaSpAF4da3Z6Ta7vhdBzVTID9cEyFjpsQ9ZfrccTtruYaOGW_Z3TsH7BoV8nXpl1Ycb-1imp1JJOEpU2XGCfs1K4Su9WGT3A8I9z9RaIc5OyR1J4DeXLIs-YdcpnmvwYELAJ-ce4AA6XqrZPya0pQBuBGNfQBLUFITcuTbqp18D7eJf3IodrrYGZxcHNaY';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsloading] = useState(false);
  const loginClick = async () => {
    console.log('api call login');
    setIsloading(true);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens}`,
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        device_token: '6F:70:95:4A:8E:8F',
      }),
    };
    try {
      const res = await fetch(
        'https://staging.coinpanda.io/api/login',
        requestOptions,
      );
      const data = await res.json();
      console.log('res', data?.data?.access_token);
      if (data.code === 200) {
        setIsloading(false);
        navigation.navigate('Dashboard', {token: data?.data?.access_token});
      } else {
        Alert.alert('opps!! please enter valid id and password');
      }
    } catch (error) {
      console.log('error');
      setIsloading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <Text style={{fontSize: 30, color: 'black', marginTop: '30%'}}>
          Loading...
        </Text>
      )}
      {!isLoading && (
        <View style={styles.loginBox}>
          <Text style={styles.txtHead}>Sign In</Text>
          <Text style={styles.txtSubtitle}>
            Don't have an acocunt?{' '}
            <Text style={styles.signupTxt}>Sign Up!</Text>
          </Text>

          <View style={styles.txtBox}>
            <Textfield
              placeholder="Email"
              onChangeText={val => setEmail(val)}
            />
            <Textfield
              placeholder="Password"
              isRightIcon
              isPassword
              onChangeText={val => setPassword(val)}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassTxt}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={loginClick}>
            <Text style={styles.txtBtn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
  },
  loginBox: {
    marginTop: '30%',
  },
  txtHead: {
    fontSize: 25,
    fontWeight: '900',
  },
  txtSubtitle: {
    fontSize: 15,
    marginTop: 20,
  },
  signupTxt: {
    color: 'blue',
  },
  txtBox: {
    marginTop: '10%',
  },
  forgotPassTxt: {
    color: 'blue',
    fontSize: 14,
    textAlign: 'right',
    marginRight: '10%',
  },
  loginBtn: {
    backgroundColor: '#0f7c80',
    width: 150,
    alignItems: 'center',
    marginTop: 60,
    marginLeft: '25%',
    padding: 10,
    borderRadius: 10,
  },
  txtBtn: {
    fontSize: 18,
    color: 'white',
  },
});
