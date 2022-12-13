import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

export default function LogOutButton() {
    const navigation = useNavigation(); // useがつく reactHooksは 関数の中などで呼び出しできず、ここで呼び出す

    function handlePress() {
        firebase.auth().signOut()
            .then(() => {
                // サインアウトするとログイン画面に遷移したい
                // ただ、これはコンポーネントであり、スクリーンなのでnavigationオブジェクトを受け取れない
                //  →useNavigationを使う
                // ログアウト時にすべての履歴をリセットし、遷移する
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LogIn'}],
                })
            })
            .catch(() => {
                Alert.alert("couldn't logout");
            });
    }

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <Text stlye={styles.label}>ログアウト</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    label: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    }
})