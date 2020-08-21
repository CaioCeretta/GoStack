import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import api from './services/api';

// Os elementos não possuem valor semantico, como por exemplo, footer;strong;italic;etc, que você sabe o que eles serão na página
// Não possuem estilização própria, não existe id ou classe, é usado, até o momento do curso, o StyleSHeet
// Todos componentes possuem por padrão "display: flex"
// Não temos herança de estilos, não adianta colocar o estilo em um container e querer que os filhos desse elemento recebam esse estilo

// Componente View se assemelha ao div, footer, header, main, section
// Componente TExt se assemelha ao p, span, h1, h2, h3

export default function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    }, [])

    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <View style={styles.container}>
            <Text style={styles.title}>Hello GoStack</Text>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7159c1',
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },

    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'

    }
});