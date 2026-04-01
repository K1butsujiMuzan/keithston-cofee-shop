import {ATTRIBUTES, BUTTON_TYPES} from "./constants.js";

export const cardTemplate = (id, title, price, image, quantity) => `
    <article class="top-products__card card" data-js-product-${id}>
        <div class="top-products__card-container">
          <img
            class="top-products__card-image card-image"
            src="./assets/images/products/${image}"
            alt="${title}"
            width="360"
            height="360"
            loading="lazy"
          />
        </div>
        <div class="top-products__card-controls">
          <div class="top-products__card-information">
            <h3 class="top-products__card-title">${title}</h3>
            <span class="top-products__card-price">$${price}</span>
          </div>
          ${quantity === 0 ?
    `<button
              class="top-products__card-button main-button"
              type="button"
              ${ATTRIBUTES.PRODUCT_ID}="${id}"
              ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.ADD}"
            >
              Add
            </button>` :
    `<div class="top-products__card-buttons main-buttons">
              <button
                class="top-products__card-button main-button"
                type="button"
                ${ATTRIBUTES.PRODUCT_ID}="${id}"
                ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.REMOVE}"
              >
                -1
              </button>
              <span class="top-products__card-quantity">${quantity}</span>
              <button
                class="top-products__card-button main-button"
                type="button"
                ${ATTRIBUTES.PRODUCT_ID}="${id}"
                ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.ADD}"
              >
                +1
              </button>
            </div>`
  }
        </div>
      </article>
`