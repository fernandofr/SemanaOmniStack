import React, { Component } from "react";
import api from "../../services/api";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";

export default class New extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    newTweet: ""
  };

  goBack = () => {
    this.props.navigation.pop();
  };

  handleTweet = async () => {
    const content = this.state.newTweet;
    const author = await AsyncStorage.getItem("@OmniStack:username");

    await api.post("tweets", { author, content });

    this.goBack();
  };

  handleInputChange = newTweet => {
    this.setState({ newTweet });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="close" size={24} color="#4BB0EE" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.handleTweet}>
            <Text style={styles.buttonText}>Tweetar</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder="O que está acontecendo?"
          placeholderTextColor="#999"
          value={this.state.newTweet}
          onChangeText={this.handleInputChange}
          returnKeyType="send"
          onSubmitEditing={this.handleTweet}
        />
      </SafeAreaView>
    );
  }
}
