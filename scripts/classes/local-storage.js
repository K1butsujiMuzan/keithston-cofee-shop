import { LOCAL_STORAGE_KEYS } from '../constants/constants.js'

export class LocalStorage {
  static getLocalStorageData = () => {
    const basket =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.BASKET_KEY)) ?? []
    const transformedBasket = basket.map((item) => ({
      id: Number(item.id),
      quantity: Number(item.quantity),
    }))
    const totalPrice =
      Number(localStorage.getItem(LOCAL_STORAGE_KEYS.TOTAL_PRICE)) ?? 0
    const totalQuantity =
      Number(localStorage.getItem(LOCAL_STORAGE_KEYS.TOTAL_QUANTITY)) ?? 0

    return [transformedBasket, totalPrice, totalQuantity]
  }

  static updateLocalStorage = (basket, totalPrice, totalQuantity) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.BASKET_KEY, JSON.stringify(basket))
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOTAL_PRICE, String(totalPrice))
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.TOTAL_QUANTITY,
      String(totalQuantity),
    )
  }
}
