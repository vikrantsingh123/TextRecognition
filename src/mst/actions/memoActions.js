const memoActions = self => ({
  addItem(list) {
    let id = self.memoArray.length + 1;
    let name = 'hey';
    let content = list[0].resultText;
    // list.forEach(element => {
    //content.push();
    // });
    // content.push(list[0].resultText);
    let obj = {
      id,
      name,
      content
    };

    self.memoArray.push(obj);
  },

  clear() {
    self.memoArray = [];
  }
});

export default memoActions;
