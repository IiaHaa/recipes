import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';
import { API_URL, API_TOKEN } from '@env';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
 
  const getRepositories = () => {
    fetch(`${API_URL}${keyword}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    })
    .then(response => response.json())
    .then(responseJson => setRepositories(responseJson.meals))
    .catch(error => { 
        Alert.alert('Error', error.message); 
    });
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image style={{width:250, height:100, paddingBottom:10}} source={{uri:(item.strMealThumb)}}/>
          </View>}
        data={repositories} 
        ItemSeparatorComponent={listSeparator} />
      <TextInput style={{fontSize: 18, width: 200}} placeholder='keyword' 
        onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={getRepositories} />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
});

// expo start --clear