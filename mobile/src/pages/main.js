import React, { Component } from 'react';
import api from '../services/api';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: 'JSLend'
    };

    state = {
        lendInfo: {},
        docs: [],
        page: 1,
    };

    componentDidMount() {
        this.loadLends();
    };

    loadLends = async (page = 1) => {
        const response = await api.get(`/lends?page=${page}`);

        const { docs, ... lendInfo } = response.data;

        this.setState({ docs: [... this.state.docs, ...docs], lendInfo, page });
    };

    loadMore = () => {
        const { page, lendInfo } = this.state;

        if (page === lendInfo.pages) return;

        const pageNumber = page + 1;

        this.loadLends(pageNumber);
    };

    renderItem = ({ item }) => (
        <View style={styles.lendContainer}>
            <Text style={styles.lendItem}>{item.item}</Text>
            <Text style={styles.lendContact}>{item.contact}</Text>

            <TouchableOpacity 
                style={styles.lendButton} 
                onPress={() => {
                    this.props.navigation.navigate('Lend', { lend: item });
                }}
            >
                <Text style={styles.lendButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },

    list: {
        padding: 20,
    },

    lendContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },

    lendItem: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    lendContact: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24,
    },

    lendButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    lendButtonText: {
        fontSize: 16,
        color: '#DA552F'
    },




});