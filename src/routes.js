import { createAppContainer, createStackNavigator } from 'react-navigation';

import Welcome from './screens/welcome';
import Camera from './screens/camera';

const MainStack = createStackNavigator({ Welcome, Camera });

const Routes = createAppContainer(MainStack);

export default Routes;
