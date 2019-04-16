import { types } from 'mobx-state-tree';

import memoStore from './memo';
// Store model
const storeModel = types.model('Store', {
  memoStore: memoStore
});

export default storeModel;
