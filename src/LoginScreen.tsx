import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';

GoogleSignin.configure({
    webClientId: 'auth-react-native-6807c', // Reemplaza con tu Web Client ID de Firebase
});

export default function LoginScreen({ navigation }: any) {
    useEffect(() => {
        GoogleSignin.configure();
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            const { idToken } : any = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            navigation.replace('Home'); // Navega a la pantalla principal
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('./assets/google-logo.png')} style={styles.logo} />
            <Text style={styles.title}>Bienvenido</Text>
            <Button title="Iniciar sesión con Google" onPress={handleGoogleSignIn} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});