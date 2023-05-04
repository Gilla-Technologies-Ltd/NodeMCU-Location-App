import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export const LoginScreen = ({ navigation }) => {
  const [userType, setUserType] = useState('player');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            userType === 'player' ? styles.activeButton : {},
          ]}
          onPress={() => setUserType('player')}
        >
          <Text style={styles.buttonText}>Player</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            userType === 'serviceUser' ? styles.activeButton : {},
          ]}
          onPress={() => setUserType('serviceUser')}
        >
          <Text style={styles.buttonText}>Service User</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCompleteType="password"
      />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  button: {
    padding: 10,
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  buttonText: {
    color: 'blue',
  },
});

export default LoginScreen;
