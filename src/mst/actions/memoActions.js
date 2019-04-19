import { destroy } from 'mobx-state-tree';
const memoActions = self => ({
  addItem(list) {
    let name = 'Untitiled Text ' + parseInt(self.memoArray.length + 1);
    let content = [];
    list.forEach(element => {
      content.push(element.text);
    });
    let obj = {
      name,
      content,
    };

    self.memoArray.push(obj);
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
