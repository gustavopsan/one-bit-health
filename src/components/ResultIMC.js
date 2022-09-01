import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';

export default function ResultIMC(props) {

    const onShare = async () => {
        const result = await Share.share({
            message: "Meu IMC hoje é: " + props.result,
        })
    };

    return (
        <View style={styles.resultContext}>
            <Text style={styles.message}>{props.message}</Text>
            <Text style={styles.result}>{props.result}</Text>
            <View style={styles.shareContext}>
                { props.result != null ?
                    <React.Fragment>
                        <TouchableOpacity onPress={onShare} style={styles.shareButton}>
                            <Text style={styles.shareText}>Share</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                    :
                    <View/>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    resultContext: {
        flex: 1,
        marginTop: 15,
        paddingTop: 30,
        borderRadius: 50,
        alignItems: "center",
        width: "100%",
    },
    result: {
        fontSize: 48,
        color: '#FF0043',
        fontWeight: "bold",
    },
    message: {
        fontSize: 16,
        color: '#FF0043',
        fontWeight: "bold",
    },
    shareContext: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 10,
    },
    shareButton: {
        backgroundColor: "#1877f2",
        borderRadius: 50,
        paddingBottom: 5,
        paddingTop: 5,
    },
    shareText: {
        color: '#ffffff',
        fontWeight: "bold",
        paddingHorizontal: 30
    },
    clearButton: {
        backgroundColor: "#FF0043",
        borderRadius: 50,
        paddingBottom: 5,
        paddingTop: 5,
    },
    clearButtonText: {
        color: '#ffffff',
        fontWeight: "bold",
        paddingHorizontal: 30
    },
});