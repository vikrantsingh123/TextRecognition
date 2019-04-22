import { destroy } from 'mobx-state-tree';
import firebase from 'react-native-firebase';
import moment from 'moment';
import { getParent } from 'mobx-state-tree';

const memoActions = self => ({
  addItem(list) {
    let name = 'Untitiled Text ' + parseInt(self.memoArray.length + 1);
    let list2 = [];
    list.forEach(element => {
      list2.push(element.text);
    });
    let content = list2.join('\n');
    let time = moment()
      .valueOf()
      .toString();
    console.log(content);
    let obj = {
      name,
      content,
      time,
    };

    self.memoArray.push(obj);

    //const { uid } = getParent(self).userStore;
    const uid = firebase.auth().currentUser.uid;
    getParent(self).userStore.setUid(uid);

    console.log('uidsdfsdaf', uid);
    ref = firebase.database().ref(`user/client/${uid}/memo/${time}`);

    ref.update(obj).catch(err => {
      console.log(ref);
    });
  },
  loaderTrue() {
    self.loader = true;
  },
  loaderFalse() {
    self.loader = false;
  },
  clear() {
    self.memoArray = [];
  },
  delete(index) {
    destroy(self.memoArray[index]);
  },
  overlayTrue(id) {
    self.editId = parseInt(id);
    self.overlayVisible = true;
  },
  setEditId(id) {
    self.editId = parseInt(id);
  },
  overlayFalse() {
    self.overlayVisible = false;
  },
  editName(name) {
    self.memoArray[self.editId].name = name;
    self.overlayVisible = false;
  },
  saveContent(list) {
    self.memoArray[self.editId].content = list;
  },
});

export default memoActions;
