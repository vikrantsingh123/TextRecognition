import { destroy } from 'mobx-state-tree';
import firebase from 'react-native-firebase';
import moment from 'moment';
import { getParent } from 'mobx-state-tree';

const memoActions = self => ({
  fetchList() {
    const { uid } = getParent(self).userStore;
    self.loaderTrue();
    var list = [];
    ref = firebase.database().ref(`user/client/${uid}/memo`);
    ref.once('value', snapshot => {
      if (snapshot.exists()) {
        ref = firebase.database().ref(`user/client/${uid}/memo`);

        ref.once('value', snapshot => {
          snapshot.forEach(item => {
            list.push(item.val());

            if (snapshot.numChildren() == list.length) {
              this.addList(list);
              self.loaderFalse();
            }
          });
        });
      }
    });
  },

  addList(list) {
    self.memoArray = list;
  },
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

    let obj = {
      name,
      content,
      time,
    };

    self.memoArray.push(obj);

    const uid = getParent(self).userStore.uid;

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
    const { uid } = getParent(self).userStore;

    ref = firebase.database().ref(`user/client/${uid}/memo`);

    ref.remove().catch(err => {
      console.log(ref);
    });
    self.memoArray = [];
  },
  delete(index) {
    const { uid } = getParent(self).userStore;
    const time = self.memoArray[self.editId].time;

    ref = firebase.database().ref(`user/client/${uid}/memo/${time}`);

    ref.remove().catch(err => {
      console.log(ref);
    });
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
    const { uid } = getParent(self).userStore;
    const time = self.memoArray[self.editId].time;

    ref = firebase.database().ref(`user/client/${uid}/memo/${time}`);

    ref.update({ name: name }).catch(err => {
      console.log(ref);
    });

    self.memoArray[self.editId].name = name;
    self.overlayVisible = false;
  },
  saveContent(list) {
    const { uid } = getParent(self).userStore;
    const time = self.memoArray[self.editId].time;

    ref = firebase.database().ref(`user/client/${uid}/memo/${time}`);

    ref.update({ content: list }).catch(err => {
      console.log(ref);
    });
    self.memoArray[self.editId].content = list;
  },
});

export default memoActions;
