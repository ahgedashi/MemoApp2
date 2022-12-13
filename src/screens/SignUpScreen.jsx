import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AppBar from '../components/AppBar';
import Button from '../components/Button';
import firebase from 'firebase';

export default function SignUpScreen(props) {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handplePress() {
        // firebase.auth().createUserWithEmailAndPassword(email, password)： ↑のemailとpasswordを登録する
        // .then： 登録ができた後の処理を書く
        // userCrendentialからuserというオブジェクトを取り出す
        // userCredentialはuserに関する情報を受け取ることができる（コールバック関数）
        // .catch： error発生時（例外処理をどうするか） errorというオブジェクトを受け取れる。
        //      error.codeやerror.messageなどがある
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                console.log(user.uid);

                //ナビゲーション
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MemoList' }],
                })
            })
            .catch((error) => {
                Alert.alert(error.code);
            });
    }

    return (
        <View style={styles.container}>  
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={ (text) => { setEmail(text); } }
                    autoCapitalize="none" //入力時にキーボード入力がShiftを押された状態ではなくする
                    keyboardType='email-address' //入力時のキーボードの種類をメールアドレス用キーボードにする
                    placeholder="Email Address" //placeholder
                    textContentType='emailAddress' //端末保存のキーチェーンから自動補完される
                />

                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={ (text) => { setPassword(text); }}
                    autoCapitalize="none"
                    placeholder="Password"
                    secureTextEntry //secureTextEntry={true}と同じ意味 パスワード用に入力文字を「●●●」にする
                    textContentType='Password'
                />

                <Button
                    label="Submit"
                    onPress={handplePress}/>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <TouchableOpacity
                        onPress={() => { 
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'LogIn' }],
                            });
                        }}
                    >
                        <Text style={styles.footerLink}>Log in.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    inner: {
        paddingHorizontal: 27,
        paddingVertical: 24,
    },
    title: {
        lineHeight: 32,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        fontSize: 16,
        height: 48,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        marginBottom: 16,
    },

    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3',
    },
    footer: {
        flexDirection: 'row'
    }
})