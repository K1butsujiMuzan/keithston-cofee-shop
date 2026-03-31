'use strict'

import {
  ATTRIBUTES,
  BUTTON_TYPES,
  LOCAL_STORAGE_KEYS,
} from "./constants/constants.js";
import {cardTemplate} from "./constants/card-template.js";
import {basketEmpty, basketTemplate} from "./constants/basket-template.js";

export class Products {
  selectors = {
    topProducts: '[data-js-top-products]',
    basketContainer: '[data-js-basket]',
    basketPrice: '[data-js-basket-price]',
    basketOrder: '[data-js-basket-order]',
    basketTotalQuantity: '[data-js-basket-total-quantity]',
    basketClear: '[data-js-basket-clear]'
  }

  constructor() {
    this.topProductsContainer = document.querySelector(this.selectors.topProducts)
    this.basketContainer = document.querySelector(this.selectors.basketContainer)
    this.basketPriceContainer = document.querySelector(this.selectors.basketPrice)
    this.basketTotalQuantity = document.querySelector(this.selectors.basketTotalQuantity)
    this.basketOrder = document.querySelector(this.selectors.basketOrder)
    this.basketClear = document.querySelector(this.selectors.basketClear)

    const basket = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.BASKET_KEY)) ?? []
    this.basket = basket?.map(item => ({id: Number(item.id), quantity: Number(item.quantity)}))
    this.totalPrice = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.TOTAL_PRICE)) ?? 0
  }

  getProducts = async () => {
    try {
      const response = await fetch('../products.json')
      if(!response.ok) {
        console.error('Something went wrong, status: ', response.status)
        return
      }
      const data = await response.json()
      if(Array.isArray(data)) {
        this.products = data
        const categories = new Set(data.map(item => item.type))
        this.categories = [...categories.keys()]
        this.bindEvents()
      }
    } catch (error) {
      console.error(error)
    }
  }

  setTopProducts = () => {
    const popularProducts = this.categories.map(item => {
      return this.products.find(product => product.type === item)
    })
    this.topProductsContainer.innerHTML = popularProducts.map(({id, title, price, image,}) => {
      return cardTemplate(id, title, price, image, this.basket.find(item => item.id === id)?.quantity ?? 0)
    }).join('')
  }

  updateLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.BASKET_KEY, JSON.stringify(this.basket))
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOTAL_PRICE, this.totalPrice)
  }

  setBasket = () => {
    this.basketPriceContainer.innerHTML = `$${this.totalPrice}`
    this.basketTotalQuantity.textContent = this.basket.reduce((sum, {quantity}) => sum + quantity, 0)
    if(this.basket.length === 0) {
      return this.basketContainer.innerHTML = basketEmpty
    }
    this.basketContainer.innerHTML = this.basket.map(({id, quantity}) => {
      const currentProduct = this.products.find(item => item.id === id)
      return [...Array(quantity)].map(_ => {
        return basketTemplate(id, currentProduct.title, currentProduct.price, currentProduct.image)
      }).join('')
    }).join('')
  }

  onChangeProductQuantity = (button) => {
    const buttonType = button.getAttribute(ATTRIBUTES.BUTTON_TYPE)
    const productId = Number(button.getAttribute(ATTRIBUTES.PRODUCT_ID))
    const currentProduct = this.basket.find(({id}) => id === productId)
    const currentProductPrice = this.products.find(product => product.id === productId).price

    if(buttonType === BUTTON_TYPES.ADD && this.basket.reduce((sum, {quantity}) => sum + quantity, 0) >= 100) {
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

    this.totalPrice = Number(this.totalPrice.toFixed(2))
    this.updateLocalStorage()
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
    this.updateLocalStorage()
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