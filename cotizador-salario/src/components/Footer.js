import { RefreshControlBase } from "react-native";
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from "../utils/styles";

export default function Footer(props) {
    const { calculate } = props;
    return (
        <View style={styles.viewFooter}>
            <TouchableOpacity style={styles.button} onPress={calculate}>
                <Text style={styles.text}>CALCULAR</Text>
            </TouchableOpacity>
        </View>
    );
}
