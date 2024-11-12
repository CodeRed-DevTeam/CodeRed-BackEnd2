import { StyleSheet, SafeAreaView } from "react-native";
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

const Stack = createNativeStackNavigator();

export default function App({navigation}) {
  const [loaded] = useFonts({
    Poppins: require("./assets/font/Poppins-Medium.ttf"),
    PoppinsBold: require("./assets/font/Poppins-Bold.ttf"),
  });

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
