//start.js

import { View, StyleSheet, Text, TextInput, ImageBackground, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from "react-native"
import Chat from "./Chat"
import { useState } from "react"
import { getAuth, signInAnonymously } from "firebase/auth";

const image = { uri: 'https://i.pinimg.com/564x/e6/27/ac/e627ac9dbda722a8676142a86e78d425.jpg' }

const Start = ({ navigation }) => {
    const [name, setName] = useState('')
    const [background, setBackground] = useState('')

    // initialized the Firebase authentication handler
    const auth = getAuth()

    // once the user is signed in, the app navigates to the Chat screen while passing result.user.uid (which is assigned to the route parameter userID)
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate('Chat', { name: name, background: background, userID: result.user.uid })
                Alert.alert('Sign-in Successful!')
            })
            .catch((error) => {
                Alert.alert('Sign-in failed, try again!')
            })
    }


    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.appTitle}>App Title</Text>
            </View>
            <View style={styles.mainView}>
                <TextInput
                style={styles.textInput}
                value={name} onChangeText={setName}
                placeholder='Type your username here'
                />

                {/* View with text and colors container  */}
                <View>
                    <Text
                    style={styles.chooseText}>Choose Background Color</Text>
                {/* only colors container     */}
                    <View style={styles.colorsContainer}>
                        <TouchableOpacity
                            style={[styles.selectStyle, styles.selectColor1]}
                            onPress={() => setBackground(styles.selectColor1.backgroundColor)}>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectStyle, styles.selectColor2]}
                            onPress={() => setBackground(styles.selectColor2.backgroundColor)}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectStyle, styles.selectColor3]}
                            onPress={() => setBackground(styles.selectColor3.backgroundColor)}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectStyle, styles.selectColor4]}
                            onPress={() => setBackground(styles.selectColor4.backgroundColor)}
                        ></TouchableOpacity>
                    </View>
                </View>


                <TouchableOpacity
                    style={styles.buttonStart}
                    onPress={signInUser}>
                    <Text style={styles.textButton}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    titleView: {
        flex: 2,
        justifyContent: 'space-around'
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainView: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '88%',
        height: '44%',
        marginBottom: 30,
        justifyContent: 'space-evenly',
        borderRadius: 10,
    },
    textInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#757083',
        marginTop: '8%',
        marginBottom: 15,
        top: 5
    },
    chooseText: {
        fontSize: 18,
        fontWeight: '300',
        color: '#757083',
        opacity: 100,

    },
    colorsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: "space-between",
        
    },
    selectStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,

    },
    selectColor1: {
        backgroundColor: '#090C08',
    },
    selectColor2: {
        backgroundColor: '#474056',
    },
    selectColor3: {
        backgroundColor: '#8A95A5',
    },
    selectColor4: {
        backgroundColor: '#B9C6AE',
    },

    buttonStart: {
        
        top: 10,
        marginBottom: "6%",
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        backgroundColor: '#757083',
        padding: 20,
        width: '70%',
        borderRadius: 10,
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
    }
})

export default Start