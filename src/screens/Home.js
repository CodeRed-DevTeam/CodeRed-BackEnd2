import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styling";
import { Button} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons"; 

const Home = ({ navigation }) => {
  const footer = require("../../assets/gradient.png");
  const codered = require("../../assets/codered.png");
  const [isUserPressed, setIsUserPressed] = useState(false);
  const [isAdminPressed, setIsAdminPressed] = useState(false);

  return (
    <SafeAreaView style={portalStyle.container}>
      <Text>Home Dashboard Screen</Text>
    </SafeAreaView>
  );
};

export default Home;

const portalStyle = StyleSheet.create(styles);