import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MAIN_NAV, MainNavParamList} from './';
import HomeScreen from '../screens/HomeScreen';
import NamesScreen from '../screens/NamesScreen';

const MainStack = createNativeStackNavigator<MainNavParamList>();

const MainNav = () => {
  
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <MainStack.Screen name={MAIN_NAV.HOME} component={HomeScreen} />
      <MainStack.Screen name={MAIN_NAV.NAMES} component={NamesScreen} />
    </MainStack.Navigator>
  );
};

export default MainNav;
