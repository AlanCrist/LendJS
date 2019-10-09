import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';
import Lend from './pages/lend';

export default createStackNavigator(
    {
        Main,
        Lend
    },
    {
    navigationOptions: {
        headerTitleStyle: {
            textAlign: 'center',
            flex: 1,
        },
        headerStyle: {
            backgroundColor: "#DA552F",
        },
        headerTintColor: "#FFF",
    },
});