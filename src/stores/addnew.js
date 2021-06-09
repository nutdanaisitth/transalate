import { observable, action, decorate } from 'mobx'

class AddNewStore  {
    
    isClose = false
    storeClose() {
        this.isClose = true
    }
    clearClose() {
        this.isClose = false
    }
}
decorate(AddNewStore, {
    isClose: observable,
    storeClose: action,
    clearClose: action
})

export default new AddNewStore()