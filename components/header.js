import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import SideMenu from "./SideMenu";


export default function Header() {
    const [menuVisible, setMenuVisible] = useState(false);


    return (
        <View style={styles.container}>
            <Text style={styles.texto}>
                M
            </Text>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Ionicons name="menu-outline" size={40} color="#000000" />
            </TouchableOpacity>

            <SideMenu 
                visible={menuVisible} 
                onClose={() => setMenuVisible(false)} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: 100,
        paddingLeft: 36,
        paddingRight: 36, 
        paddingTop: 36,
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center" 
    },
    texto: {
        fontSize: 48,
        color: "#612BFF",
        fontWeight: "bold",
        fontFamily: "Montserrat"
    }
})