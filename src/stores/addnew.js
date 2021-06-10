import { observable, action, decorate } from "mobx";

class AddNewStore {
  isClose = false;
  isValidate = false;
  isFirst = 0;
  storeClose() {
    this.isClose = true;
  }
  clearClose() {
    this.isClose = false;
  }
  storeValidate = (isValidate) => {
    this.isValidate = isValidate;
  };
  storeIsFirst = (isFirst) => {
    this.isFirst = isFirst;
  };
  clearIsFirst = () => {
    this.isFirst = 0;
  };
}
decorate(AddNewStore, {
  isClose: observable,
  storeClose: action,
  clearClose: action,
  storeValidate: action,
  storeIsFirst: action,
  clearIsFirst: action
});

export default new AddNewStore();
