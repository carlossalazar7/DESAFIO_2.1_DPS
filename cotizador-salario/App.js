import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import Form from './src/components/Forms';
import Footer from './src/components/Footer';
import {styles} from './src/utils/styles';
import Result from './src/components/Result';
import AsyncStorage from '@react-native-community/async-storage'

export default function App() {

    const [usuario, setUsuario] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [salario, setSalario] = useState(0);
    const [proximoSalario, setProximoSalario] = useState(null);
    const [anios, setAnios] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (nombre && apellidos && salario && anios && categoria) calculate();
        else reset();
    }, [nombre, apellidos, salario, anios, categoria, proximoSalario]);

    const calculate = () => {
        reset();
        if (nombre === '') {
            setErrorMessage('Ingrese sus nombres');
        } else if (apellidos === '') {
            setErrorMessage('Ingrese sus apellidos');
        } else if (salario === 0) {
            setErrorMessage('Ingrese su salario');
        } else if (salario <= 0) {
            setErrorMessage('Ingrese un salario real');
        } else if (anios === 0 || anios <= 0) {
            setAnios(0);
            setErrorMessage('Ingrese sus años trabajados');
        } else {
            //TODO: logica para calcular salario en base a años
            if (anios > 29) {
                setAnios(29)
                setErrorMessage('No aplica aúnmento de salario, se dejara base 29');
            }

            let incremento = parseInt(categoria * salario) + parseInt(anios * salario);
            setProximoSalario(parseInt(salario) + parseInt(incremento));
            setUsuario({
                nombre: nombre,
                apellidos: apellidos,
                salario: salario,
                proximoSalario: proximoSalario,
                anios: anios,
                categoria: categoria
            })
            let indice = nombre.substring(0, 2) + '-' + apellidos.substring(0, 2)+'-'+anios;
            AsyncStorage.setItem(indice, JSON.stringify(usuario));
        }
    };
    const reset = () => {
        setErrorMessage('');
    };

    const verUsuarios = () => {
        setErrorMessage('');
    };


    return (
        <>

            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={styles.Header}>
                <Text style={styles.HeadApp}>Cotizador de Salario</Text>
                <Form
                    setApellidos={setApellidos}
                    setNombre={setNombre}
                    setSalario={setSalario}
                    setAnios={setAnios}
                    setCategoria={setCategoria}
                    categoria={categoria}/>
            </SafeAreaView>
            <Result
                nombre={nombre}
                apellidos={apellidos}
                salario={salario}
                anios={anios}
                categoria={categoria === '0.05' ? 'Categoria 3' : categoria === '0.10' ? 'Categoria 2' : 'Categoria 1'}
                errorMessage={errorMessage}
                proximoSalario={proximoSalario}/>
            <Footer
                verUsuarios={verUsuarios}
                calculate={calculate}/>
        </>
    );
}
