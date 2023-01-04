/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import MyDrawer from './src/navigation/Drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  LogBox.ignoreAllLogs(true)
  useEffect(() => {
    Name()
  }, []);
  const Name = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Gender')
    } catch (e) {
      // read error
    }
  }
  return (
    //   <NavigationContainer>
    //  <RequestBlood/>
    //   </NavigationContainer>
    <MyDrawer />
  );
};
export default App;

 

// Import React in our code
// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Autocomplete from 'react-native-autocomplete-input';

// const App = () => {
//   const [films, setFilms] = useState([]);
//   const [filteredFilms, setFilteredFilms] = useState([]);
//   const [selectedValue, setSelectedValue] = useState({});

//   useEffect(() => {
//     fetch('https://bloodlinks.in/get_states')
//       .then((response) => response.json())
//       .then((response) => {
//         var states = Object.keys(response).length;
//         let statesArray = [];
//         for (var i = 0; i < states; i++) {
//           statesArray.push({
//             value: response[i].state_id,
//             label: response[i].state_name,
//           })
//         }
//         console.log('api response ', response)
//         setFilms(statesArray);
//       })
//       .catch((error) => {
//         console.error('catch api error', error);
//       });
//   }, []);

//   const searchText = (text) => {
//     let matches = [];
//     if (text) {
//       matches = films.filter(
//         res => {
//           const regex = new RegExp(`${text.trim()}`, 'i');
//           return res.label.match(regex);
//         });
//       setFilteredFilms(matches);
//     } else {
//       setFilteredFilms([]);
//     }
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <Autocomplete
//           autoCapitalize="none"
//           autoCorrect={false}
//           containerStyle={styles.autocompleteContainer}
//           onChangeText={(text) => searchText(text)}
//           placeholder="Enter the film title"
//           data={filteredFilms}
//           defaultValue={
//             JSON.stringify(selectedValue) === '{}' ?
//               '' :
//               selectedValue.label
//           }
//           flatListProps={{
//             renderItem: ({ item }) =>

//               <TouchableOpacity
//                 onPress={() => {
//                   setSelectedValue(item);
//                   setFilteredFilms([]);
//                 }}>
//                 <Text>
//                   {item.label}
//                 </Text>
//               </TouchableOpacity>
//           }}

//         />

//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5FCFF',
//     flex: 1,
//     padding: 16,
//   },
//   autocompleteContainer: {
//     backgroundColor: '#ffffff',

//   },
//   descriptionContainer: {
//     flex: 1,
//     backgroundColor: 'pink',
//     justifyContent: 'center',
//   },
//   itemText: {
//     fontSize: 15,
//     paddingTop: 5,
//     paddingBottom: 5,
//     margin: 2,
//   },
//   infoText: {
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });
// export default App;