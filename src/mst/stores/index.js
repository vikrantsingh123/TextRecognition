import storeModel from './../models';

// Create instance of store model
const store = storeModel.create({
  memoStore: {
    loader: false,
    memoArray: [],
    overlayVisible: false,
    editId: 0,
  },
});

export default store;
