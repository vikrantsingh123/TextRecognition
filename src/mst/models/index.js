import { types } from 'mobx-state-tree';

import memoStore from './memo';
import userStore from './user';
// Store model
const storeModel = types.model('Store', {
  memoStore: memoStore,
  userStore: userStore,
});

export default storeModel;
