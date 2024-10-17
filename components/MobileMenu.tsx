import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { BellIcon, ChartBarSquareIcon, SunIcon,
    ShoppingCartIcon, UserIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

export default function MobileMenu() {
    const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <View style={styles.container}>
        <Pressable style={styles.menuIcon}>
            <BellIcon size={28} color="black"/>
        </Pressable>
        <Pressable style={styles.menuIcon}>
            <ChartBarSquareIcon size={28} color="black" />
        </Pressable>
        <Pressable style={styles.accentMenuIcon}>
            <SunIcon size={28} color="white" />
        </Pressable>
        <Pressable style={styles.menuIcon}>
            <ShoppingCartIcon size={28} color="black" />
        </Pressable>
        <Pressable style={styles.menuIcon} onPress={() => navigation.navigate('Profile')}>
            <UserIcon size={28} color="black" />
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: CONSTS.COLOR.WHITE,
        display: 'flex',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: CONSTS.SIZE.SM,
    },
    menuIcon: {
        paddingVertical: CONSTS.SIZE.SM,
        paddingHorizontal: CONSTS.SIZE.MD,
    },
    accentMenuIcon: {
        paddingVertical: CONSTS.SIZE.MD,
        paddingHorizontal: CONSTS.SIZE.MD,
        backgroundColor: CONSTS.COLOR.PRIMARY,
        borderRadius: 100,
    },
})