import {ATTRIBUTES, BUTTON_TYPES} from "./constants.js";

export const productModalButtonsTemplate = (id, quantity) => {
  if(quantity === 0) {
    return `
      <button
        class="product-modal__button main-button"
        type="button"
        ${ATTRIBUTES.PRODUCT_ID}="${id}"
        ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.ADD}"
      >
        Add
      </button>
    `
  }
  return `
    <button
      class="product-modal__button main-button"
      type="button"
      ${ATTRIBUTES.PRODUCT_ID}="${id}"
      ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.REMOVE}"
    >
      -1
    </button>
    <span class="product-modal__quantity">${quantity}</span>
    <button
      class="product-modal__button main-button"
      type="button"
      ${ATTRIBUTES.PRODUCT_ID}="${id}"
      ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.ADD}"
    >
      +1
    </button>
  `
}