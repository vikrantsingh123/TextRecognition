import firebase from 'react-native-firebase';
import { getParent } from 'mobx-state-tree';
import { Toast } from 'native-base';

const userActions = self => ({
  setEmail(email) {
    self.email_text = email;
  },
  setPassword(password) {
    self.password = password;
  },
  setUid() {
    self.uid = firebase.auth().currentUser.uid;
  },
  onLoginPress() {
    self.error = '';
    self.loading1 = true;

    firebase
      .auth()
      .signInWithEmailAndPassword(self.email_text, self.password)
      .then(() => this.onLoginSuccess())
      .catch(() => this.onLoginFailFirst());
  },
  onLoginFailFirst() {
    self.error = 'Wrong credentials or User does not exist';
    self.loading1 = false;
    self.loading2 = false;
  },
  onDupLoginFail() {
    self.error = 'User Already Exists';
    self.loading1 = false;
    self.loading2 = false;
  },
  onLoginFail() {
    self.error = 'Authentication Failed';
    self.loading1 = false;
    self.loading2 = false;
  },
  onLoginSuccess() {
    self.email_text = '';
    self.password = '';
    self.loading1 = false;
    self.loading2 = false;
    self.error = '';
    self.uid = firebase.auth().currentUser.uid;
  },
  onSignUpPress() {
    self.error = '';
    self.loading2 = true;
    firebase
      .auth()
      .createUserWithEmailAndPassword(self.email_text, self.password)
      .then(() =>
        firebase
          .database()
          .ref(`user/client/${firebase.auth().currentUser.uid}`)
          .set({ email: `${firebase.auth().currentUser.email}` })
      )
      .then(() => this.onLoginSuccess())
      .catch(() => this.onDupLoginFail());
  },
  resetUser() {
    self.uid = self.email = self.email_text = self.password = self.error = '';
    self.loading1 = self.loading2 = false;
  },

  signoutUser() {
    // Empty store
    this.resetUser();
    firebase.auth().signOut();
  },
});

export default userActions;
