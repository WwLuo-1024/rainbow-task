/* eslint-disable prettier/prettier */
import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Divider } from '@rneui/themed';
// import mockData from './mock/data.json';
import Top from './components/Top';
import Middle from './components/Middle';
import Footer from './components/Footer';
import useLoadProductList from './hooks/useLoadProductList';
import { View } from '@ant-design/react-native';
// type DataType = {
//   originalPrice: number;
//   discountPrice: number;
// }

function App() {
  const {loading} = useLoadProductList();
  if (loading) {
    console.log('正在加载');
  }

  return (
    <ScrollView style={[styles.container]}>
      {loading && (<View style={{textAlign:'center', marginTop: 50}}>
                    <ActivityIndicator size="large" color="#00ff00"/>
                  </View>
      )}

      {!loading && (<View>
      <Top />
      <Divider />

      {/* Middle */}
      <Middle />
      <Divider />

      {/* Footer */}
      <Footer />
      <Divider /></View>)}
      {/* Top */}



    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3f1e1',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    paddingTop: 30,
  },
});

export default App;
