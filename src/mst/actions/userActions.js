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
  setUid(uid) {
    self.uid = uid;
  },
  onLoginPress() {
    self.error = '';
    self.loading1 = true;

    firebase
      .auth()
      .signInWithEmailAndPassword(self.email_text, self.password)
      .then(self.onLoginSuccess())
      .catch(self.onLoginFailFirst());
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
    console.log('self', self, firebase.auth().currentUser);
    //self.uid = firebase.auth().currentUser.uid;
  },
  onSignUpPress() {
    // const { email, password } = this.state;
    //this.setState({ error: '', loading2: true });
    self.error = '';
    self.loading2 = true;

    //console.log('ref', `user/client/${firebase.auth().currentUser.uid}`);
    console.log('email text', self.email_text, self.password);

    firebase
      .auth()
      .createUserWithEmailAndPassword(self.email_text, self.password)
      .then(() =>
        firebase
          .database()
          .ref(`user/client/${firebase.auth().currentUser.uid}`)
          .set({ email: `${firebase.auth().currentUser.email}` })
      )
      .then(self.onLoginSuccess())
      .catch(self.onDupLoginFail());
  },
  resetUser() {
    self.email = self.email_text = self.password = self.error = '';
    self.loading1 = self.loading2 = false;
  },

  signoutUser() {
    const parentNode = getParent(self);

    // Empty store
    this.resetUser();

    firebase
      .auth()
      .signOut()
      .then(() => {
        props.navigation.navigate('SplashScreen');
      })
      .catch(() =>
        Toast.show({
          text: 'Problem signing out!',
          buttonText: 'Okay',
        })
      );
  },
});

export default userActions;
