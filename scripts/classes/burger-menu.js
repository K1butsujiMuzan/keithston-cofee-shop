export class BurgerMenu  {
  selectors = {
    burgerButton: '[data-js-burger-button]',
    headerMenuList: '[data-js-header-menu-list]',
  }

  classes = {
    burgerButtonOpen: 'is-open',
    headerMenuListOpen: 'is-open',
  }

  constructor() {
    this.burgerButton = document.querySelector(this.selectors.burgerButton)
    this.headerMenuList = document.querySelector(this.selectors.headerMenuList)
    if(this.burgerButton && this.headerMenuList) {
      this.bindEvents()
    }
  }

  onToggleBurger = () => {
    this.burgerButton.classList.toggle(this.classes.burgerButtonOpen)
    this.headerMenuList.classList.toggle(this.classes.headerMenuListOpen)
  }

  bindEvents() {
    this.burgerButton.addEventListener('click', this.onToggleBurger)
  }
}