import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Card = props => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardB1}>
        <View>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: `${props?.coinimageurl}`,
            }}
          />
        </View>
        <View>
          <Text style={styles.cardTitle}>
            {props?.coinname !== '' ? props?.coinname : 'No name'}
          </Text>
          <Text style={styles.txt1}>{props?.coin}</Text>
        </View>
      </View>
      <View style={styles.cardB2}>
        <Text style={styles.cardTitle}>${props?.price.toFixed(2)}</Text>
        <Text
          style={
            props.trend24h > 0
              ? styles.green
              : props.trend24h === 0
              ? styles.neutral
              : styles.red
          }>
          <FontAwesome5
            name={
              props.trend24h > 0
                ? 'arrow-up'
                : props.trend24h < 0 && 'arrow-down'
            }
            size={18}
          />{' '}
          {props.trend24h.toFixed(2)}%
        </Text>
      </View>
      <View style={styles.cardB3}>
        <Text style={styles.cardTitle}>${props?.value.toFixed(2)}</Text>
        <Text>{props?.holdings.toFixed(2)}%</Text>
      </View>
    </View>
  );
};

const Dashboard = ({route, navigation}) => {
  const token = route.params.token;
  const [portfolio, setPortfolio] = useState();
  const getData = async () => {
    console.log('api call');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await fetch(
        `https://staging.coinpanda.io/api/portfolio/balance`,
        requestOptions,
      );
      const data = await res.json();
      // console.log('Dashboard', data?.data?.balancedata[1]);
      setPortfolio(data?.data?.balancedata);
    } catch (error) {
      console.log('dashboard ', error);
      navigation.pop();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Assets</Text>
      <View style={styles.headings}>
        <Text style={[styles.headingTxt, {marginLeft: 19}]}>Asset</Text>
        <View style={styles.headings1}>
          <Text style={styles.headingTxt}>Price</Text>
          <Text style={styles.headingTxt}>Holding</Text>
        </View>
      </View>
      {portfolio?.map(item => {
        return <Card {...item} />;
      })}
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'whitesmoke',
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: 'black',
  },
  headings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headings1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '48%',
    marginRight: 10,
  },
  headingTxt: {
    fontSize: 14,
    color: 'gray',
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  cardB1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    margin: 0,
    borderRadius: 25,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: 'black',
  },
  txt1: {
    color: 'gray',
  },
  cardB2: {
    width: '30%',
    alignItems: 'flex-end',
  },
  cardB3: {
    width: '30%',
    alignItems: 'flex-end',
  },
  green: {
    backgroundColor: '#e0f7df',
    color: '#0d9406',
  },
  red: {
    backgroundColor: '#f7e0df',
    color: '#bf1206',
  },
  neutral: {
    backgroundColor: 'white',
  },
});
