import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Layouts } from '../layouts'
import { Cog6ToothIcon, UserIcon } from 'react-native-heroicons/outline';
import { CONSTS } from '../constants';
import { Components } from '../components';


export default function ProfileView() {
    let abortController = new AbortController();

    return (
        <Layouts.AppLayout>
            <Layouts.MainLayout>
                <ScrollView style={styles.container}>
                    <View style={styles.top}>
                        <Text style={styles.viewTitle}>Mon profil</Text>
                        <Pressable style={styles.icon}>
                            <Cog6ToothIcon size={28} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.infoContainer}>
                        <View>
                            <Components.SafeImage source={undefined}
                            width={100} height={100} style={styles.image}/>
                            <Text>Burno Pittico</Text>
                        </View>
                        <View>
                            <View>
                                <View style={styles.statItem}>
                                    <UserIcon size={28} color={'blue'}/>
                                    <View>
                                        <Text>Parrainage</Text>
                                        <Text>2</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Layouts.MainLayout>
        </Layouts.AppLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: CONSTS.SIZE.MD,
    },
    top: {
        paddingVertical: CONSTS.SIZE.LG,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    viewTitle: {
        fontSize: CONSTS.SIZE.XL,
        color: CONSTS.COLOR.BLACK,
        fontWeight: 'bold',
    },
    icon: {
        paddingHorizontal: CONSTS.SIZE.MD,
        paddingVertical: CONSTS.SIZE.MD,
        borderWidth: 1,
        borderColor: CONSTS.COLOR.LIGHT,
        borderRadius: 100,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        objectFit: 'cover',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
})