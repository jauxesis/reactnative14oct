import React from 'react';
import { Alert, AppRegistry, Button, ScrollView, ListView, FlatList, StyleSheet, Image, Text, TextInput, View } from 'react-native';
//import { Blink } from 'app';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { text:'' };
  }

  callmetofetch(){

      try{
        fetch('https://freegeoip.net/json/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          alert(JSON.stringify(responseJson));
        })
        .catch((error) => {
          console.error(error);
        });
      }catch(error){
        console.error(error);
      }
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.movies),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    let pic = {
      uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={styles.container}>
        <Text style={{color:'red'}}>Welcome React NativeJS</Text>
        <ScrollView>
        <TextInput
          style={{height:40,color:'white'}}
          placeholder="Type your text...!"
          onChangeText={(text)=>this.setState({text})}
        />

        <Text style={{padding:10},styles.textinputs}>
          {this.state.text.split(' ').map((word)=>word).join(' ')}
        </Text>

        <Button onPress={()=>{Alert.alert('Ok its button!')}} title="Press Me"/>

        <Button onPress={()=>{this.callmetofetch();}} title="Call Get"/>

        <View style={styles.container}>
          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
        </View>

        <Image source={require('./img/auxesis_new.png')} style={styles.auxesisimage} />

        <Text>Yup! Open up App.js to start working on your app!OK.</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu. sdf</Text>

        <Image source={require('./img/block.png')} style={styles.auxesisimage} />

        </ScrollView>
      </View>
    );
  }
  //Image source={pic} style={[styles.headertext]}/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkslategrey',
    height:'100%',
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  auxesisimage:{
    width:100,
    height:30
  },
  headertext:{
    flex:1,
    top:0,
    height:40,
    minHeight:40
  },
  textinputs:{
    fontSize:20
  }
});
