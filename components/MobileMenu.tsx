import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BellIcon, ChartBarSquareIcon, SunIcon, ShoppingCartIcon, UserIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';

export default function MobileMenu() {
  return (
    <View style={styles.container}>
      <BellIcon size={28} color="black" />
      <ChartBarSquareIcon size={28} color="black" />
      <SunIcon size={28} color="black" />
      <ShoppingCartIcon size={28} color="black" />
      <UserIcon size={28} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: CONSTS.SIZE.MD,
    },
})