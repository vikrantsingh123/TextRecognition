import storeModel from './../models';

// Create instance of store model
const store = storeModel.create({
  memoStore: {
    loading: true,
    memoArray: []
  }
});

export default store;
