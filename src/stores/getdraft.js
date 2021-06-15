import { observable, action, decorate } from "mobx";

class GetDraftStore {
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
  onEditModal = false
  onAddNewModal = false
  id= 0
  attachments = []

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
    attachments
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
    this.id = id
    this.attachments = attachments
  };
  storeOnClick = (onClick) => {
    this.onClick = onClick;
  };

  storeEditModal = (isModal) => {
    this.onEditModal = isModal
  }
  storeAddModal = (isModal) => {
    this.onAddNewModal = isModal
  }
}
decorate(GetDraftStore, {
  test: observable,
  storeClose: action,
  storeData: action,
  storeEditModal: action
});

export default new GetDraftStore();
