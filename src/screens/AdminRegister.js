import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, Image, View, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput, Button, Checkbox, RadioButton } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReturnButtons from "../components/returnButtons";
import styles from "../styles/styling";
import { supabase } from '../../src/SupaBase/Database';

const AdminRegister = ({ navigation }) => {
  const codered = require("../../assets/codered.png");
  const footer = require("../../assets/gradient.png");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isRegisterPressed, setIsRegisterPressed] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [gender, setGender] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePhoneNumberChange = (input) => {
    const numericInput = input.replace(/[^0-9]/g, '');
    if (numericInput.length <= 10) {
      setPhoneNumber(numericInput);
    }
  };

  const [selectedDateText, setSelectedDateText] = useState("DATE OF BIRTH"); 

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
    setSelectedDateText(currentDate.toLocaleDateString('en-US')); 
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };


  const handleRegister = async () => {
    const formattedDate = dateOfBirth.toLocaleDateString('en-US');
    console.log(firstName, lastName, phoneNumber, country, region, city, email, password, gender, formattedDate);
  
    if (!firstName || !lastName || !phoneNumber || !country || !region || !city || !email || !password || !gender || !formattedDate) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    if (!checked) {
      Alert.alert("Error", "Please agree to the Terms and Conditions");
      return;
    }
  
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
  
      if (error && error.message.includes("Email address cannot be used")) {
        Alert.alert("Registration Error", "This email address is not authorized. Please try another one.");
      }
      
      const { error: dbError } = await supabase.from('admin').insert([{
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        gender,
        date_of_birth: formattedDate,
      }]);
  
      if (dbError) {
        console.log("Database error:", dbError); 
        Alert.alert("Database Error", dbError.message);
        return;
      }
  
      Alert.alert("Success", "You have successfully registered!");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error during registration:", error); 
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
            Join Us, Pulse!
          </Text>
          <Text style={{
            color: 'black',
            fontFamily: 'Poppins',
            fontSize: 13,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: 1
            }}>
            Join Code Red to help save lives by donating blood or connecting donors with those in urgent need!
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
                    onPress={() => {
                      console.log('Selected gender:', 'male');
                      setGender('male');
                    }}
                  />
                
                <Text style={{ fontFamily: "Poppins", color: 'black',  }}>MALE</Text>

                <RadioButton
                    value="female"
                    color="red"
                    uncheckedColor="red"
                    status={gender === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      console.log('Selected gender:', 'female');
                      setGender('female');
                    }}
                  />
                
                <Text style={{ fontFamily: "Poppins", color: 'black' }}>FEMALE</Text>
                </View>
            <View>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View style={registerStyle.datePickerContainer}>
              <Text style={[registerStyle.dateText, { textTransform: 'uppercase', fontFamily: 'Poppins', color: 'black' }]}>
              {selectedDateText} 
                </Text>
              </View>
            </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

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
              value={country}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              onChangeText={setCountry}
              style={[registerStyle.textInput, { fontFamily: "PoppinsBold" }]}
            />

            <TextInput
              placeholder="REGION"
              value={region}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              onChangeText={setRegion}
              style={[registerStyle.textInput, { fontFamily: "PoppinsBold" }]}
            />

            <TextInput
              placeholder="CITY"
              value={city}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              onChangeText={setCity}
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
