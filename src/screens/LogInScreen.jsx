import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AppBar from '../components/AppBar';
import Button from '../components/Button';
import firebase from 'firebase';

export default function LogInScreen(props) {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect()：レンダリング（prposの変更）の度に実行されある
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // ログイン中であれば、メモリスト画面（次画面）へ遷移する
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MemoList' }],
                })
            }
        });
        
        return unsubscribe;
    }, []); // , [] を付与することで、１度だけ（画面が開いたとき）実行される
            // これは[]の中に何か値を入れると、それを監視してくれる。その値が変化されたときだけ
            // useEffectが実施される

    function handlePress() {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                console.log(user.uid);
                
                //ログイン成功時だけ遷移を行う
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
                <Text style={styles.title}>Log In</Text>

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
                    onPress={handlePress}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'SignUp' }],
                            });
                        }}
                    >
                        <Text style={styles.footerLink}>Sign up here!</Text>
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