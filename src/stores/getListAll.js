import { observable, action, decorate } from "mobx";

class GetListAllStore {
  name = "";
  empDep = "";
  projName = "";
  fileName = "";
  thaiToEng = 0;
  engToThai = 0;
  composeEng = 0;
  doneAt = "";
  note = "";
  createdAt = "";
  onEditModal = false;
  onAddNewModal = false;
  id = 0;
  attachments = [];
  successTitle = "";
  access_token = "";
  level = [];
  translator = ""

  onClick = false;
  storeData = (
    name,
    empDep,
    projName,
    fileName,
    thaiToEng,
    engToThai,
    composeEng,
    doneAt,
    note,
    createdAt,
    id,
    attachments,
    translator
  ) => {
    this.name = name;
    this.empDep = empDep;
    this.projName = projName;
    this.fileName = fileName;
    this.thaiToEng = thaiToEng;
    this.engToThai = engToThai;
    this.composeEng = composeEng;
    this.doneAt = doneAt;
    this.note = note;
    this.createdAt = createdAt;
    this.id = id;
    this.attachments = attachments;
    this.translator = translator
  };
  storeOnClick = (onClick) => {
    this.onClick = onClick;
  };

  storeAccessToken = (token) => {
    this.access_token = token;
  };

  storeEditModal = (isModal) => {
    this.onEditModal = isModal;
  };

  storeAddModal = (isModal) => {
    this.onAddNewModal = isModal;
  };

  storeSuccessTitle = (successTitle) => {
    this.successTitle = successTitle;
  };
  storeLevel = (level) => {
    this.level = level;
  };
}
decorate(GetListAllStore, {
  test: observable,
  storeClose: action,
  storeData: action,
  storeEditModal: action,
  storeSuccessTitle: action,
  storeAccessToken: action,
  storeLevel: action,
});

export default new GetListAllStore();
