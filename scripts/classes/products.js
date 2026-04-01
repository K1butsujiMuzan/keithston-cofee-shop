import {
  ATTRIBUTES,
  BUTTON_TYPES,
} from "../constants/constants.js";
import {cardTemplate} from "../constants/card-template.js";
import {basketModalEmpty, basketModalTemplate} from "../constants/basket-modal-template.js";
import {
  LocalStorage,
} from "./local-storage.js";

export class Products {
  selectors = {
    topProducts: '[data-js-top-products]',
    basketContainer: '[data-js-basket-modal-list]',
    basketPrice: '[data-js-basket-modal-price]',
    basketOrder: '[data-js-basket-modal-order]',
    basketTotalQuantity: '[data-js-basket-modal-total-quantity]',
    basketClear: '[data-js-basket-modal-clear]'
  }

  constructor(products, categories) {
    this.topProductsContainer = document.querySelector(this.selectors.topProducts)
    this.basketContainer = document.querySelector(this.selectors.basketContainer)
    this.basketPriceContainer = document.querySelector(this.selectors.basketPrice)
    this.basketTotalQuantityContainer = document.querySelector(this.selectors.basketTotalQuantity)
    this.basketOrder = document.querySelector(this.selectors.basketOrder)
    this.basketClear = document.querySelector(this.selectors.basketClear)

    const [basket, totalPrice, totalQuantity] = LocalStorage.getLocalStorageData()
    this.basket = basket
    this.totalPrice = totalPrice
    this.totalQuantity = totalQuantity

    this.products = products
    this.categories = categories

    this.bindEvents()
  }

  setTopProducts = () => {
    const popularProducts = this.categories.map(item => {
      return this.products.find(product => product.type === item)
    })
    this.topProductsContainer.innerHTML = popularProducts.map(({id, title, price, image,}) => {
      return cardTemplate(id, title, price, image, this.basket.find(item => item.id === id)?.quantity ?? 0)
    }).join('')
  }

  setBasket = () => {
    this.basketPriceContainer.innerHTML = `$${this.totalPrice}`
    this.basketTotalQuantityContainer.textContent = String(this.totalQuantity)
    if(this.basket.length === 0) {
      return this.basketContainer.innerHTML = basketModalEmpty
    }
    this.basketContainer.innerHTML = this.basket.map(({id, quantity}) => {
      const currentProduct = this.products.find(item => item.id === id)
      return [...Array(quantity)].map(_ => {
        return basketModalTemplate(id, currentProduct.title, currentProduct.price, currentProduct.image)
      }).join('')
    }).join('')
  }

  onChangeProductQuantity = (button) => {
    const buttonType = button.getAttribute(ATTRIBUTES.BUTTON_TYPE)
    const productId = Number(button.getAttribute(ATTRIBUTES.PRODUCT_ID))
    const currentProduct = this.basket.find(({id}) => id === productId)
    const currentProductPrice = this.products.find(product => product.id === productId).price

    if(buttonType === BUTTON_TYPES.ADD && this.totalQuantity >= 100) {
      return alert('The number of items in the cart cannot be more than 100')
    }

    if(!currentProduct) {
      this.basket.push({id: productId, quantity: 1})
      this.totalPrice += currentProductPrice
    } else if(currentProduct && buttonType === BUTTON_TYPES.ADD) {
      this.basket = this.basket.map(item => {
        if(item.id === productId) {
          return {id: productId, quantity: currentProduct.quantity + 1}
        }
        return item
      })
      this.totalPrice += currentProductPrice
    } else if(currentProduct && buttonType === BUTTON_TYPES.REMOVE) {
      if(currentProduct.quantity === 1) {
        this.basket = this.basket.filter(item => item.id !== productId)
      } else {
        this.basket = this.basket.map(item => {
          if(item.id === productId) {
            return {id: productId, quantity: currentProduct.quantity - 1}
          }
          return item
        })
      }
      this.totalPrice -= currentProductPrice
    }

    this.totalQuantity = this.basket.reduce((sum, {quantity}) => sum + quantity, 0)
    this.totalPrice = Number(this.totalPrice.toFixed(2))
    LocalStorage.updateLocalStorage(this.basket, this.totalPrice, this.totalQuantity)
    this.setBasket()
    this.setTopProducts()
  }

  onProductAction = (event) => {
    const button = event.target.closest('button')
    if(button) this.onChangeProductQuantity(button)
  }
  
  onBasketOrder = () => {
    if(this.basket.length === 0) {
      return alert('Your cart is empty! Please add at least 1 product.')
    }
    alert('The order has been placed')
    this.onBasketClear()
  }

  onBasketClear = () => {
    this.basket = []
    this.totalPrice = 0
    this.totalQuantity = 0
    LocalStorage.updateLocalStorage(this.basket, this.totalPrice, this.totalQuantity)
    this.setBasket()
    this.setTopProducts()
  }

  bindEvents = () => {
    this.setTopProducts()
    this.setBasket()
    this.topProductsContainer.addEventListener('click', this.onProductAction)
    this.basketContainer.addEventListener('click', this.onProductAction)
    this.basketOrder.addEventListener('click', this.onBasketOrder)
    this.basketClear.addEventListener('click', () => {
      if(confirm('Are you sure?')) {
        this.onBasketClear()
      }
    })
  }
}

