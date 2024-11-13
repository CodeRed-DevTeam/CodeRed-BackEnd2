import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styling";
import { TextInput, Button} from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons"; 

const AdminRecoverPass = ({ navigation }) => {
  const logo = require("../../assets/RecoverPass.png");
  const footer = require("../../assets/gradient.png");
  const [firstName, setFirstName] = useState("");
  const [isRegisterPressed, setIsRegisterPressed] = useState(false);
  return (
    <SafeAreaView style={forgotStyle.container}>
      <View style={forgotStyle.iconContainer}>
      <View>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                marginTop: -240,
                marginBottom: -80, 
                marginLeft: -190,
                padding: 40, 
                alignItems: 'flex-start',
                justifyContent: 'center',
                position: 'sticky'
                }}
            ><Ionicons name="chevron-back" size={25} color="red" />
            </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={[forgotStyle.headingTitle, {alignSelf:'center', marginBottom: 10, marginTop:-150}]}>
          Password Recovery
        </Text>
        <Text style={[styles.subheadingTitle, {marginLeft: 22, marginRight: 22, textAlign: 'center', marginBottom: 10, fontSize:13, marginTop:-2}]}>
            Please enter your email address to receive instructions for resetting your password.
        </Text>
        <Image source={logo} style={[styles.logoImage, { width: 150, height: 150, marginTop: 10 }]} />
      </View>
      <View>
            <TextInput
              label="EMAIL"
              value={firstName}
              mode="outlined"
              activeOutlineColor="red"
              outlineColor="red"
              textColor="red"
              onChangeText={setFirstName}
              style={[styles.textInput, { fontFamily: "PoppinsBold", marginTop: 20 }]}/>
      </View>
      <View style={{ alignItems: 'center' }}>
            <Button
              mode="elevated"
              onPress={() => navigation.navigate("Login")}
              onPressIn={() => setIsRegisterPressed(true)}
              onPressOut={() => setIsRegisterPressed(false)}
              buttonColor={isRegisterPressed ? "#ff8e92" : "red"}
              labelStyle={{ fontSize: 18, textAlign: 'center', color: 'white', fontFamily: "PoppinsBold",  }} 
              style={{ paddingVertical: 7, paddingHorizontal:5, borderRadius: 5, width: 290, height: 50, marginTop:20 }}
            >
              RECOVER
            </Button>
          </View>
          <View style={[styles.footerContainer, { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex:-1 }]}>
            <Image source={footer} style={styles.footerImage} />
        </View>
    </SafeAreaView>
  );
};

export default AdminRecoverPass;

const forgotStyle = StyleSheet.create(styles);
