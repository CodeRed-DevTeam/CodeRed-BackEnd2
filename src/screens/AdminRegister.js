import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, Button, Checkbox, RadioButton } from "react-native-paper";
import styles from "../styles/styling";
import Ionicons from '@expo/vector-icons/Ionicons';
import ReturnButtons from "../components/returnButtons"; 
import { supabase } from '../../src/SupaBase/Database';
import { Alert } from "react-native";

const AdminRegister = ({navigation}) => {
  const codered = require("../../assets/codered.png");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isRegisterPressed, setIsRegisterPressed] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [gender, setGender] = useState('');
  const footer = require("../../assets/gradient.png");

  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleDateChange = (input) => {

    const cleanedInput = input.replace(/\D/g, '');


    let formattedInput = '';

    if (cleanedInput.length >= 2) {
      formattedInput += cleanedInput.slice(0, 2) + '/';
    }
    if (cleanedInput.length >= 4) {
      formattedInput += cleanedInput.slice(2, 4) + '/';
      formattedInput += cleanedInput.slice(4, 8); 
    } else if (cleanedInput.length > 2) {
      formattedInput += cleanedInput.slice(2);
    }

    setDateOfBirth(formattedInput);
  };


  const handlePhoneNumberChange = (input) => {

    const numericInput = input.replace(/[^0-9]/g, ''); 
    if (numericInput.length <= 10) {
      setPhoneNumber(numericInput);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(prevState => !prevState);
  };

  const handleRegister = async () => {
    // Validate form fields
    if (!firstName || !lastName || !phoneNumber || !currentAddress || !country || !region || !city || !email || !password || !confirmPassword || !gender || !dateOfBirth) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    // Password mismatch validation
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
  
    // Check if Terms and Conditions checkbox is checked
    if (!checked) {
      Alert.alert("Error", "Please agree to the Terms and Conditions");
      return;
    }
  
    try {
      // Attempt to register the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        Alert.alert("Registration Error", error.message);
        return;
      }
  
      // Insert the user data into your database
      const { error: dbError } = await supabase
        .from('users')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            address: currentAddress,
            email,
            gender,
            date_of_birth: dateOfBirth,
          },
        ]);
  
      if (dbError) {
        Alert.alert("Database Error", dbError.message);
        return;
      }
  
      // If registration is successful, navigate to the Login screen
      Alert.alert("Success", "You have successfully registered!");
      navigation.navigate("AdminLogin");
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={registerStyle.scrollContent} 
          keyboardShouldPersistTaps="handled" 
        >
          <ReturnButtons onPress={() => navigation.goBack()} />
          <Image source={codered} style={[styles.logoImage, { width: 150, height: 150, marginTop: 0 }]} />
          <Text style={[styles.headingTitle, { textAlign: 'center' }]}>
            Admin Registration
          </Text>
          <Text style={{
            color: 'black',
            fontFamily: 'Poppins',
            fontSize: 13,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: 1
            }}>
            Register your Admin ID to create your Administrator account.
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextInput
                    label="FIRST NAME"
                    value={firstName}
                    mode="outlined"
                    activeOutlineColor="red"
                    outlineColor="red"
                    textColor="red"
                    onChangeText={setFirstName}
                    style={[registerStyle.textInput, { fontFamily: "PoppinsBold", flex: 1, marginRight: 8 }]} // Adjust margin as needed
                />
                <TextInput
                    label="LAST NAME"
                    value={lastName}
                    mode="outlined"
                    activeOutlineColor="red"
                    outlineColor="red"
                    textColor="red"
                    onChangeText={setLastName}
                    style={[registerStyle.textInput, { fontFamily: "PoppinsBold", flex: 1 }]} // Adjust margin as needed
                />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginHorizontal:40 }}>
                <Text style={{fontFamily:'Poppins', fontSize: 17, color: 'red', marginLeft: -30}}>SEX </Text>
                <RadioButton
                    value="male"
                    color="red"
                    uncheckedColor="red"
                    status={gender === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('male')}
                />
                <Text style={{ fontFamily: "Poppins", color: 'black',  }}>MALE</Text>

                <RadioButton
                    value="female"
                    color="red"
                    uncheckedColor="red"
                    status={gender === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('female')}
                />
                <Text style={{ fontFamily: "Poppins", color: 'black' }}>FEMALE</Text>
                </View>
        <View>
        <TextInput
            label="DATE OF BIRTH"
            value={dateOfBirth}
            mode="outlined" // Change this to "flat" if you prefer a flat style
            activeOutlineColor="red"
            outlineColor="red"
            textColor="red"
            onChangeText={handleDateChange}
            style={{
                width: 290, // Adjust the width
                height: 50, // Adjust the height
                fontFamily: "PoppinsBold",
                paddingHorizontal: 10, // Adjust horizontal padding
                borderRadius: 5, // Optional: for rounded corners
                marginLeft: 10
            }}
            maxLength={10}
            keyboardType="numeric" // Ensure that the keyboard is numeric
            placeholder="MM/DD/YYYY" // Placeholder text
            />

            <TextInput
              label="+63 | PHONE NUMBER"
              value={phoneNumber}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              onChangeText={handlePhoneNumberChange}
              style={[registerStyle.textInput, { fontFamily: "PoppinsBold" }]}
              maxLength={10} // Limit input to 10 characters
            />
            <TextInput
              placeholder="COUNTRY"
              value={currentAddress}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              onChangeText={setCurrentAddress}
              style={[registerStyle.textInput, { fontFamily: "PoppinsBold" }]}
            />
            <TextInput
              placeholder="REGION"
              value={currentAddress}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              onChangeText={setCurrentAddress}
              style={[registerStyle.textInput, { fontFamily: "PoppinsBold" }]}
            />
            <TextInput
              placeholder="CITY"
              value={currentAddress}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              onChangeText={setCurrentAddress}
              style={[registerStyle.textInput, { fontFamily: "PoppinsBold" }]}
            />
            <TextInput
              placeholder="ADMIN ID"
              value={username}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              onChangeText={setUsername}
              style={[registerStyle.textInput, { fontFamily: "PoppinsBold" }]}
            />
            <TextInput
              placeholder="EMAIL"
              value={email}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              onChangeText={setEmail}
              style={[registerStyle.textInput, { fontFamily: "PoppinsBold" }]}
            />
            <TextInput
              placeholder="PASSWORD"
              value={password}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              secureTextEntry={!isPasswordVisible}
              onChangeText={setPassword}
              right={
                <TextInput.Icon 
                  icon={isPasswordVisible ? "eye-off" : "eye"} 
                  color="red" 
                  onPress={togglePasswordVisibility} 
                />
              }
              style={[registerStyle.textInput, { fontFamily: "PoppinsBold" }]}
            />

            <TextInput
              placeholder="CONFIRM PASSWORD"
              value={confirmPassword}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              secureTextEntry={!isPasswordVisible}
              onChangeText={setPassword}
              right={
                <TextInput.Icon 
                  icon={isPasswordVisible ? "eye-off" : "eye"} 
                  color="red" 
                  onPress={togglePasswordVisibility} 
                />
              }
              style={[registerStyle.textInput, { fontFamily: "PoppinsBold" }]}
            />
          </View>

          <View style={[registerStyle.checkboxContainer, { marginBottom: 2, marginLeft: 3 }]}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              type="unchecked"
              uncheckedColor="red"
              color="red"
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={registerStyle.checkboxLabel}>
              By proceeding, I agree with the Terms and Conditions and Privacy Policy.
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Button
              mode="elevated"
              onPress={handleRegister}
              onPressIn={() => setIsRegisterPressed(true)}
              onPressOut={() => setIsRegisterPressed(false)}
              buttonColor={isRegisterPressed ? "#ff8e92" : "red"}
              labelStyle={{ fontSize: 18, textAlign: 'center', color: 'white', fontFamily: "PoppinsBold" }} 
              style={{ paddingVertical: 7, paddingHorizontal: 5, margin: 10, borderRadius: 5, width: 290, height: 50, marginBottom:120 }}
            >
              PROCEED
            </Button>
          </View>
            <View style={[styles.footerContainer, { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:-1 }]}>
            <Image source={footer} style={styles.footerImage} />
            </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AdminRegister;

const registerStyle = StyleSheet.create(styles);
