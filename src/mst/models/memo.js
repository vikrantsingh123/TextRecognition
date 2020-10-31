import { types } from 'mobx-state-tree';

import memoActions from './../actions/memoActions';

// Individual workout model
const memoModel = types.model('memoModel', {
  name: types.string,
  content: types.maybe(types.string),
  time: types.maybe(types.string),
});

const memoStore = types
  .model('memoStore', {
    memoArray: types.array(memoModel),
    loader: types.boolean,
    overlayVisible: types.boolean,
    editId: types.number,
  })
  .views(self => ({
    get getworkLoading() {
      return self.loading;
    },
  }))
  .actions(memoActions);

export default memoStore;
