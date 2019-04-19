import { createAppContainer, createStackNavigator } from 'react-navigation';

import Welcome from './screens/welcome';
import Camera from './screens/camera';
import MemoView from './screens/memoView';
import EditView from './screens/editView';
const MainStack = createStackNavigator({ Welcome, Camera, MemoView, EditView });

const Routes = createAppContainer(MainStack);

export default Routes;
