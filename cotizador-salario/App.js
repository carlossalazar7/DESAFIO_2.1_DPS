import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StatusBar } from 'react-native';
import Form from './src/components/Forms';
import Footer from './src/components/Footer';
import { styles } from './src/utils/styles';
import Result from './src/components/Result';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [salario, setSalario] = useState(0);
  const [anios, setAnios] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (nombre && apellidos && salario && anios) calculate();
    else reset();
  }, [nombre, apellidos, salario, anios, categoria]);

  const calculate = () => {
    reset();
    if (nombre==='') {
      setErrorMessage('Ingrese sus nombres');
    }else if (apellidos==='') {
      setErrorMessage('Ingrese sus apellidos');
    } else if (salario===0) {
      setErrorMessage('Ingrese su salario');
    } else if (anios===0) {
      setErrorMessage('Ingrese sus años trabajados');
    } else {
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);
      setTotal({
        monthlyFee: fee.toFixed(2).replace(',', '.'),
        totalPayable: (fee * months).toFixed(2).replace(',', '.'),
      });
    }
  };
  const reset = () => {
    setErrorMessage('');
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.Header}>
        <Text style={styles.HeadApp}>Cotizador de Salario</Text>
        <Form
          setApellidos={setApellidos}
          setNombre={setNombre}
          setSalario={setSalario}
          setAnios={setAnios}
          setCategoria={setCategoria} />
      </SafeAreaView>
      <Result
        nombre={nombre}
        apellidos={apellidos}
        salario={salario}
        anios={anios}
        categoria={categoria}
        errorMessage={errorMessage} />
      <Footer calculate={calculate} />
      <Footer></Footer>
    </>
  );
}
