import React from 'react';

import { Text } from 'react-native';

const Lend = () => <Text>Lend</Text>;

Lend.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.lend.item,
});

export default Lend;