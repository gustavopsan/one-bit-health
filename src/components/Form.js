import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Vibration, Pressable, Keyboard, FlatList } from 'react-native';
import ResultIMC from './ResultIMC';

export default function Form() {

    const [ height, setHeight ] = useState(null);
    const [ weight, setWeight ] = useState(null);
    const [ message, setMessage ] = useState("");
    const [ result, setResult ] = useState(null);
    const [ errorHeight, setErrorHeight ] = useState(null);
    const [ errorWeight, setErrorWeight ] = useState(null);
    const [ buttonLabel, setButtonLabel ] = useState("Calcular IMC");
    const [resultList, setResultList ] = useState([]);

    function calculateIMC() {
        Keyboard.dismiss();

        if (isEmpty(height) || isEmpty(weight)) {
            setMessage("Preencha todos os campos para prosseguir");
            setResult(null);
            Vibration.vibrate();

            if(isEmpty(height)) {
                setErrorHeight("*Campo Obrigatório");
            }
            if(isEmpty(weight)) {
                setErrorWeight("*Campo Obrigatório");
            }

            setTimeout(clearMessages, 5000);
            return;
        } else {
            let heightFormatted = height.replace(",", ".");
            let weightFormatted = weight.replace(",", ".");
            setMessage("Seu IMC é:");

            let resultValue = (weightFormatted / (heightFormatted * heightFormatted)).toFixed(2);
            setResult(resultValue);

            setResultList((arr) => [...arr, {
                id: new Date().getTime(),
                imc: resultValue
            }]);

            setButtonLabel("Calcular novamente");
            setErrorHeight(null);
            setErrorWeight(null);

            console.log(resultList);
        }
    }

    function isEmpty(value) {
        return (value === undefined || value === null || value === "") ? true : false;
    }

    function clearFields() {
        setHeight(null);
        setWeight(null);
        setMessage("");
        setResult(null);
        setErrorHeight(null);
        setErrorWeight(null);
        setButtonLabel("Calcular IMC");
    }

    function clearMessages() {
        setMessage("");
        setErrorHeight(null);
        setErrorWeight(null);
    }

    return (
        <View style={styles.formContext}>
            { !isEmpty(result) ?
                <View style={styles.resultContext}>
                    <ResultIMC message={message} result={result}/>
                    <TouchableOpacity style={styles.formButton} onPress={() => clearFields()}>
                        <Text style={styles.formButtonText}>{buttonLabel}</Text>
                    </TouchableOpacity>
                </View>
            : 
            <Pressable onPress={Keyboard.dismiss} style={styles.formElement}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorHeight}</Text>
                <TextInput style={styles.formInput} placeholder='Ex.: 1.74' keyboardType='numeric' value={height} onChangeText={setHeight}/>

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorWeight}</Text>
                <TextInput style={styles.formInput} placeholder='Ex.: 75.234' keyboardType='numeric' value={weight} onChangeText={setWeight}/>
                <TouchableOpacity style={styles.formButton} onPress={() => calculateIMC()}>
                    <Text style={styles.formButtonText}>{buttonLabel}</Text>
                </TouchableOpacity>
            </Pressable>
            }
            <FlatList style={styles.resultsList} showsVerticalScrollIndicator={false} data={resultList.reverse()} renderItem={(item) => { return( <Text style={styles.itemElement}>Resultado: <Text style={styles.itemResult}>{item.item.imc}</Text></Text> ) }} keyExtractor={ (item) => { return item.id } } />
        </View>
    )
}

const styles = StyleSheet.create({
    formContext: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 10,
        paddingTop: 30
    },
    formElement: {
        width: '100%',
        height: 'auto',
        paddingTop: 20,

    },
    formLabel: {
        color: '#000000',
        fontSize: 18,
        paddingLeft: 20,
    },
    formInput: {
        width: '90%',
        borderRadius: 50,
        backgroundColor: '#F6F6F6',
        height: 40,
        margin: 12,
        paddingLeft: 20,
    },
    formButton: {
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: '#FF0043',
        paddingTop: 14,
        paddingBottom: 14,
        marginLeft: 12,
        marginTop: 30,
    },
    formButtonText: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    errorMessage: {
        fontSize: 10,
        color: 'red',
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    resultContext: {
        width: '100%',
        height: '50%',
    },
    resultsList: {
        marginTop: 20,
    },
    itemElement: {
        fontSize: 16,
        color: 'red',
        height: 30,
        width: '100%',
    },
    itemResult: {
        fontSize: 20,
        color: 'red',
    }
});