import React from "react";
import { Text, TextInput, View } from "react-native";
import AuthStyles from "./AuthStyles";

const InputForm = ({
  FormName,
  KeyboardType,
  AutoComplete,
  SecureTextEntry = false,
  Placeholder,
  value,
  setValue,
}) => {
  const styles = AuthStyles();
  return (
    <View style={styles.formcon}>
      <Text style={styles.title}>{FormName}</Text>
      <TextInput
        keyboardType={KeyboardType}
        style={styles.form}
        secureTextEntry={SecureTextEntry}
        autoComplete={AutoComplete}
        placeholder={Placeholder}
        placeholderTextColor={"#2C5049"}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

export default InputForm;
