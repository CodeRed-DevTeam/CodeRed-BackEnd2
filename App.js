import { StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./src/styles/styling";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login"; 
import RecoverPass from "./src/screens/RecoverPass";
import Register from "./src/screens/Register";
import Profile from "./src/screens/Profile";
import Portal from "./src/screens/Portal";
import AdminLogin from "./src/screens/AdminLogin";
import AdminRegister from "./src/screens/AdminRegister";
import AdminDashboard from "./src/screens/AdminDashboard";
import Home from "./src/screens/Home";
import AdminRecoverPass from "./src/screens/AdminRecoverPass";
import { useFonts } from "expo-font";
import { supabase } from './src/SupaBase/Database';

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [loaded] = useFonts({
    Poppins: require("./assets/font/Poppins-Medium.ttf"),
    PoppinsBold: require("./assets/font/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Session Data:", data); // Check session here
      setSession(data.session);
    };
    getSession();
  
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Auth State Change:", session); // Check session on state change
        setSession(session);
      }
    );
  
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer style={[styles.container, { backgroundColor: 'white' }]}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Portal" component={Portal} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="AdminRegister" component={AdminRegister} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="RecoverPass" component={RecoverPass} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styling = StyleSheet.create(styles);
