import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Welcome from './screens/welcome';
import Camera from './screens/camera';
import MemoView from './screens/memoView';
import EditView from './screens/editView';
import LoginForm from './screens/loginForm';
import LoadingScreen from './screens/loading';

const LoginStack = createSwitchNavigator({ LoginForm });
const MainStack = createStackNavigator({ Welcome, Camera, MemoView, EditView });

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      LoginStack,
      MainStack,
    },
    {
      initialRouteName: 'LoadingScreen',
    }
  )
);

export default Routes;
