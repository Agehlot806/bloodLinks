import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput
} from 'react-native';
const App = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const searchFilterFunction = text => {
    if (text) {

      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {

      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  const getItem = item => {
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => searchFilterFunction(text)}
        onClear={text => searchFilterFunction('')}
        placeholder="Search By Location"
        value={search}
      />
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
  },
  itemStyle: {
    padding: 10,
  },
});
export default App;


// openGps = () => {
//   var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
//   var url = scheme + '37.484847,-122.148386'
//   this.openExternalApp(url)
// }

// openExternalApp = (url) => {
// Linking.canOpenURL(url).then(supported => {
//   if (supported) {
//     Linking.openURL(url);
//   } else {
//     Alert.alert(
//       'ERROR',
//       'Unable to open: ' + url,
//       [
//         {text: 'OK'},
//       ]
//     );
//   }
// });