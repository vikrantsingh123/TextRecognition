import { types } from 'mobx-state-tree';

import userActions from './../actions/userActions';

const userModel = types
  .model('User', {
    uid: types.string,
    email: types.string,
    email_text: types.string,
    password: types.string,
    error: types.string,
    loading1: types.boolean,
    loading2: types.boolean,
  })
  .views(self => ({
    get uId() {
      return self.uid;
    },
    get currentUser() {
      return {
        uid: self.uid,
        email: self.email,
      };
    },
    get getFormSubmit() {
      return self.formSubmit;
    },
  }))
  .actions(userActions);

export default userModel;
