import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {picketSelectStyles, styles} from "../utils/styles";

export default function Form(props) {
    const {setNombre, setApellidos, setSalario, setAnios, setCategoria, categoria} = props;
    return (
        <View style={styles.viewForm}>
            <View style={styles.viewInputs}>
                <TextInput
                    placeholder="Ingrese nombre"
                    keyboardType="default"
                    style={styles.input}
                    onChange={(e) => setNombre(e.nativeEvent.text)}
                />
                <TextInput
                    placeholder="Ingrese apellido"
                    keyboardType="default"
                    style={styles.input}
                    onChange={(e) => setApellidos(e.nativeEvent.text)}
                />
            </View>

            <View style={styles.viewInputs}>
                <TextInput
                    placeholder="Ingrese salario"
                    keyboardType="numeric"
                    style={styles.input}
                    onChange={(e) => setSalario(e.nativeEvent.text)}
                />
                <TextInput
                    placeholder="Años trabajados"
                    keyboardType="numeric"
                    style={styles.input}
                    onChange={(e) => setAnios(e.nativeEvent.text)}
                />
            </View>
            <Picker
                style={picketSelectStyles}
                selectedValue={categoria}
                onValueChange={(value) => setCategoria(value)}
                placeholder={{
                    label: 'Seleccióna una categoria...',
                    value: null,
                }}>
                <Picker.Item label="Categoria 1" value="0.15"/>
                <Picker.Item label="Categoria 2" value="0.10"/>
                <Picker.Item label="Categoria 3" value="0.05"/>
            </Picker>
        </View>

    );
}