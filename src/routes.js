import { createAppContainer, createStackNavigator } from 'react-navigation';

import Welcome from './screens/welcome';
import Camera from './screens/camera';
import MemoView from './screens/memoView';

const MainStack = createStackNavigator({ Welcome, Camera, MemoView });

const Routes = createAppContainer(MainStack);

export default Routes;
