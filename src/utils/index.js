class SendElement {
  el = ''

  set setEl(el) {
    this.el = el
  }

  get getEl() {
    return this.el
  }
}

export const sendElement = new SendElement()
