/**
 * @description Main Page
 * @author Luo Wang
 */
import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Divider } from '@rneui/themed';
import { View } from '@ant-design/react-native';

import Top from './components/Top';
import Middle from './components/Middle';
import Footer from './components/Footer';
import useLoadProductList from './hooks/useLoadProductList';


function App() {
  const {loading} = useLoadProductList();
  if (loading) {
    console.log('Loading Data');
  }

  return (
    <ScrollView style={[styles.container]}>
      {/* If data is being loaded, the loading spin will be displayed. */}
      {loading && (<View style={{textAlign:'center', marginTop: 50}}>
                    <ActivityIndicator size="large" color="#00ff00"/>
                  </View>
      )}

      {/* If data is already loaded, the main page will be displayed. */}
      {!loading && (<View>
      {/* Top */}
      <Top />
      <Divider />

      {/* Middle */}
      <Middle />
      <Divider />

      {/* Footer */}
      <Footer />
      <Divider /></View>)}
      



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
