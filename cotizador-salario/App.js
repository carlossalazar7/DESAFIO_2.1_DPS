import React, {useEffect, useState} from 'react';
import {Alert, Modal, Pressable, SafeAreaView, StatusBar, Text, View} from 'react-native';
import Form from './src/components/Forms';
import Footer from './src/components/Footer';
import {styles} from './src/utils/styles';
import Result from './src/components/Result';
import AsyncStorage from '@react-native-community/async-storage'
import {DataResult} from "./src/components/DataResult";

export default function App() {
    const [nombre, setNombre] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [apellidos, setApellidos] = useState('');
    const [salario, setSalario] = useState(0);
    const [proximoSalario, setProximoSalario] = useState(null);
    const [anios, setAnios] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (nombre && apellidos && salario && anios && categoria) calculate(); else reset();
    }, [nombre, apellidos, salario, anios, categoria, proximoSalario, usuarios]);

    const calculate = async () => {
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

            let indice = nombre.substring(0, 2).toLocaleUpperCase() + '-' + apellidos.substring(0, 2).toLocaleUpperCase();

            // const clearAsyncStorage = async() => {
            //     AsyncStorage.clear();
            // }

            await AsyncStorage.setItem(indice, JSON.stringify({
                nombre: nombre,
                apellidos: apellidos,
                salario: salario,
                proximoSalario: proximoSalario,
                anios: anios,
                categoria: categoria
            }));

        }
    };
    const reset = () => {
        setErrorMessage('');
    };

    const verUsuarios = async () => {

        try {
            const keys = await AsyncStorage.getAllKeys();
            let users = []

            for (const key of keys) {
                const datos = await AsyncStorage.getItem(key);
                users.push(JSON.parse(datos))
            }
            setUsuarios(users);
            setModalVisible(true);

        } catch (error) {
            console.error(error)
        }
    }

    return (<>
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

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Usuarios</Text>
                            <View>
                                {usuarios.map((e) => <View
                                    style={{margin: 2, backgroundColor: 'beige', borderWidth: 2, padding: 3}}>
                                    <DataResult title="Nombre " value={`${e.nombre}`}/>
                                    <DataResult title="Salario " value={`$ ${e.salario}`}/>
                                    <DataResult title="Proximo Salario" value={`$ ${e.proximoSalario}`}/>
                                </View>)}
                            </View>

                            <Pressable
                                style={[styles.buttonModal, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cerrar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </>);
}
