import {Text, View} from "react-native";
import {styles} from "../utils/styles";
import React from "react";

export function DataResult(props) {
    const {title, value} = props;
    return (
        <View style={styles.value}>
            <Text>{title}</Text>
            <Text>{value}</Text>
        </View>
    );
}