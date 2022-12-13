import React, { useEffect } from "react";
import { View, StyleSheet } from 'react-native';

import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';
import MemoList from '../components/MemoList';
import LogOutButton from '../components/LogOutButton'

export default function MemoListScreen(props){
    const { navigation } = props;

    // bodyの中で他のナビゲーションのappBarのレンダリングを変更しようとしている→エラーがでる、そこでuseEffect
    // useEffect→副作用であり、レンダリングをするのは仕方のないことだよと示す必要がある
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <LogOutButton />,
                        // () => { return <LogOutButton />} でも可
        });
    }, []) 

    return(
        <View style={styles.container}>       
            <MemoList />
            <CircleButton
             name="plus"
             onPress={() => { navigation.navigate('MemoCreate'); }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F4F8',
    }, 
});