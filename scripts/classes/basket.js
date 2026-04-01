import {LocalStorage} from "./local-storage.js";
import {basketTemplate, basketEmpty} from "../constants/basket-template.js";
import {ATTRIBUTES} from "../constants/constants.js";

export class Basket {
  selectors = {
    basketList: '[data-js-basket-list]',
    basketPrice: '[data-js-basket-price]',
    basketQuantity: '[data-js-basket-quantity]',
    basketClear: '[data-js-basket-clear]',
    basketOrder: '[data-js-basket-order]',
  }

  constructor(products) {
    const [basket, totalPrice, totalQuantity] = LocalStorage.getLocalStorageData()
    this.basket = basket
    this.totalPrice = totalPrice
    this.totalQuantity = totalQuantity

    this.basketList = document.querySelector(this.selectors.basketList)
    this.basketPrice = document.querySelector(this.selectors.basketPrice)
    this.basketQuantity = document.querySelector(this.selectors.basketQuantity)
    this.basketClear = document.querySelector(this.selectors.basketClear)
    this.basketOrder = document.querySelector(this.selectors.basketOrder)

    this.products = products

    this.bindEvents()
  }

  onItemRemove = (event) => {
    const button = event.target.closest('button')
    if(button) {
      const productId = Number(button.getAttribute(ATTRIBUTES.PRODUCT_ID))
      const productQuantity = this.basket.find(({id}) => id === productId).quantity
      const productPrice = this.products.find(product => product.id === productId).price
      if(productQuantity === 1) {
        this.basket = this.basket.filter(item => item.id !== productId)
      } else {
        this.basket = this.basket.map(item => {
          if(item.id === productId) {
            return {id: productId, quantity: productQuantity - 1}
          }
          return item
        })
      }
      this.totalPrice = Number((this.totalPrice - productPrice).toFixed(2))
      this.totalQuantity = this.basket.reduce((sum, {quantity}) => sum + quantity, 0)
      LocalStorage.updateLocalStorage(this.basket, this.totalPrice, this.totalQuantity)
      this.setBasket()
    }
  }

  setBasket = () => {
    this.basketPrice.textContent = `$${this.totalPrice}`
    this.basketQuantity.textContent = String(this.totalQuantity)
    if(this.basket.length === 0) {
      return this.basketList.innerHTML = basketEmpty
    }

    this.basketList.innerHTML = this.basket.map(({id, quantity}) => {
      const currentProduct = this.products.find(item => item.id === id)
      return [...Array(quantity)].map(_ => {
        return basketTemplate(id, currentProduct.title, currentProduct.price, currentProduct.image)
      }).join('')
    }).join('')
  }

  onBasketClear = () => {
    this.basket = []
    this.totalPrice = 0
    this.totalQuantity = 0
    LocalStorage.updateLocalStorage(this.basket, this.totalPrice, this.totalQuantity)
    this.setBasket()
  }

  onBasketOrder = () => {
    if(this.basket.length === 0) {
      return alert('Your cart is empty! Please add at least 1 product.')
    }
    alert('The order has been placed')
    this.onBasketClear()
  }

  bindEvents = () => {
    this.setBasket()
    this.basketList.addEventListener('click', this.onItemRemove)
    this.basketOrder.addEventListener('click', this.onBasketOrder)
    this.basketClear.addEventListener('click', () => {
      if(confirm('Are you sure?')) {
        this.onBasketClear()
      }
    })
  }
}