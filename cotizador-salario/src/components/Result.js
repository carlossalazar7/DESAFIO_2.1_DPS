import React from 'react';
import {Text, View} from 'react-native';
import {styles} from "../utils/styles";

export default function Result(props) {
    const {nombre, apellidos, salario, proximoSalario, anios, categoria, errorMessage} = props;

    return (
        <View style={styles.content}>
            {proximoSalario &&
                (
                    <View style={styles.boxResult}>
                        <Text style={styles.title}>RESUMEN</Text>
                        <DataResult title="Nombre Completo: " value={`${nombre} ${apellidos}`}/>
                        <DataResult title="Salario Actual: " value={`$ ${salario} `}/>
                        <DataResult title="Años Trabajados: " value={`${anios} años `}/>
                        <DataResult title="Categoria Seleccionada: " value={` ${categoria} `}/>
                        <DataResult title="Salario Siguiente Año: " value={`$ ${proximoSalario} `}/>
                    </View>
                )}
            <View>
                <Text style={styles.error}>{errorMessage}</Text>
            </View>
        </View>
    );
}

function DataResult(props) {
    const {title, value} = props;
    return (
        <View style={styles.value}>
            <Text>{title}</Text>
            <Text>{value}</Text>
        </View>
    );
}