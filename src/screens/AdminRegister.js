import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, Image, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, Button, Checkbox, RadioButton } from "react-native-paper";
import styles from "../styles/styling";
import Ionicons from '@expo/vector-icons/Ionicons';
import ReturnButtons from "../components/returnButtons";
import { supabase } from '../../src/SupaBase/Database';

const Register = ({ navigation }) => {
  // State Variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleDateChange = (input) => {
    const cleanedInput = input.replace(/\D/g, '');
    let formattedInput = '';
    if (cleanedInput.length >= 2) formattedInput += cleanedInput.slice(0, 2) + '/';
    if (cleanedInput.length >= 4) formattedInput += cleanedInput.slice(2, 4) + '/';
    formattedInput += cleanedInput.slice(4, 8);
    setDateOfBirth(formattedInput);
  };

  const handlePhoneNumberChange = (input) => {
    const numericInput = input.replace(/[^0-9]/g, '');
    if (numericInput.length <= 10) setPhoneNumber(numericInput);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!checked) {
      Alert.alert("Error", "Please agree to the Terms and Conditions");
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        Alert.alert("Registration Error", error.message);
        return;
      }
      const { error: dbError } = await supabase.from('users').insert([{
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        country,
        region,
        city,
        email,
        gender,
        date_of_birth: dateOfBirth,
      }]);
      if (dbError) {
        Alert.alert("Database Error", dbError.message);
        return;
      }
      Alert.alert("Success", "You have successfully registered!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
          <ReturnButtons onPress={() => navigation.goBack()} />
          <Text style={styles.headingTitle}>Join Us, Pulse!</Text>
          <Text style={{ color: 'black', fontFamily: 'Poppins', fontSize: 13, textAlign: 'center' }}>
            Join Code Red to help save lives by donating blood or connecting donors with those in urgent need!
          </Text>

          {/* Name Inputs */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <TextInput label="FIRST NAME" value={firstName} mode="outlined" onChangeText={setFirstName} style={{ flex: 1, marginRight: 8 }} />
            <TextInput label="LAST NAME" value={lastName} mode="outlined" onChangeText={setLastName} style={{ flex: 1 }} />
          </View>

          {/* Gender Selection */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <RadioButton value="male" status={gender === 'male' ? 'checked' : 'unchecked'} onPress={() => setGender('male')} />
            <Text>Male</Text>
            <RadioButton value="female" status={gender === 'female' ? 'checked' : 'unchecked'} onPress={() => setGender('female')} />
            <Text>Female</Text>
          </View>

          {/* Date of Birth */}
          <TextInput label="DATE OF BIRTH (MM/DD/YYYY)" value={dateOfBirth} mode="outlined" onChangeText={handleDateChange} maxLength={10} keyboardType="numeric" />

          {/* Phone Number */}
          <TextInput label="+63 | PHONE NUMBER" value={phoneNumber} mode="outlined" onChangeText={handlePhoneNumberChange} maxLength={10} keyboardType="numeric" />

          {/* Address Inputs */}
          <TextInput label="COUNTRY" value={country} mode="outlined" onChangeText={setCountry} />
          <TextInput label="REGION" value={region} mode="outlined" onChangeText={setRegion} />
          <TextInput label="CITY" value={city} mode="outlined" onChangeText={setCity} />

          {/* Terms and Conditions */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
            <Text>Agree to Terms and Conditions</Text>
          </View>

          {/* Register Button */}
          <Button mode="contained" onPress={handleRegister}>PROCEED</Button>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Register;
