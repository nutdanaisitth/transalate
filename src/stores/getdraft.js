import { observable, action, decorate } from "mobx";

class GetDraftStore {
  test = "";
  onClick = false
  storeTest = (test) => {
    this.test = test;
  };
  storeOnClick = (onClick) => {
    this.onClick = onClick;
  };
}
decorate(GetDraftStore, {
  test: observable,
  storeClose: action,
});

export default new GetDraftStore();
