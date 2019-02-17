import React, { Component } from "react";

import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

export default class Login extends Component {
  state = {
    username: ""
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem("@OmniStack:username");

    if (username) {
      this.props.navigation.navigate("App");
    }
  }

  handleLogin = async () => {
    const { username } = this.state;

    if (!username.length) return;

    await AsyncStorage.setItem("@OmniStack:username", username);

    this.props.navigation.navigate("App");
  };

  handleInputChange = username => {
    this.setState({ username });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color="#4BB0EE" />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={this.state.username}
            onChangeText={this.handleInputChange}
            onSubmitEditing={this.handleLogin}
            returnKeyType="send"
          />

          <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
