import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from './components/ButtonComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      backgroundColor: '#fff',
    };
  }

  handleButtonClick = (newMessage, newColor) => {
    this.setState({ message: newMessage, backgroundColor: newColor });
  };

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
        <ButtonComponent
          backgroundColor="#227F19"
          message="GREEN button clicked!"
          onClick={this.handleButtonClick}
          colorChange="#227F19" 
          title="GREEN"
        />
        <ButtonComponent
          backgroundColor="blue"
          message="Blue button clicked!"
          onClick={this.handleButtonClick}
          colorChange="#0000FF" 
          title="BLUE"
        />
        <ButtonComponent
          backgroundColor="#A0302E"
          message="BROWN button clicked!"
          onClick={this.handleButtonClick}
          colorChange="#A0302E" 
          title="BROWN"
        />
        <ButtonComponent
          backgroundColor="#FFFF43"
          message="YELLOW button clicked!"
          onClick={this.handleButtonClick}
          colorChange="#FFFF43" 
          title="YELLOW"
        />
        <ButtonComponent
          backgroundColor="#F7251C"
          message="RED button clicked!"
          onClick={this.handleButtonClick}
          colorChange="#F7251C" 
          title="RED"
        />
        <ButtonComponent
          backgroundColor="#000000"
          message="BLACK button clicked!"
          onClick={this.handleButtonClick}
          colorChange="#000000" 
          title="BLACK"
        />
        
        {this.state.message && <Text style={styles.message}>{this.state.message}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});

export default App;
