import {ATTRIBUTES, BUTTON_TYPES, imagePath} from "./constants.js";

export const cardTemplate = (id, title, price, image, quantity) => `
    <article class="products-container__card card" data-js-product-${id}>
        <button 
          tabindex="-1"
          class="products-container__card-container"
          ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.OPEN_MODAL}"
          ${ATTRIBUTES.PRODUCT_ID}="${id}"
        >
          <img
            class="products-container__card-image card-image"
            src="${imagePath(image)}"
            alt="${title}"
            width="360"
            height="360"
            loading="lazy"
          />
        </button>
        <div class="products-container__card-controls">
          <div class="products-container__card-information">
            <button 
              class="products-container__card-title"
              ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.OPEN_MODAL}"
              ${ATTRIBUTES.PRODUCT_ID}="${id}"
            >
              ${title}
            </button>
            <span class="products-container__card-price">$${price}</span>
          </div>
          ${quantity === 0 ?
    `<button
              class="products-container__card-button main-button"
              type="button"
              ${ATTRIBUTES.PRODUCT_ID}="${id}"
              ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.ADD}"
            >
              Add
            </button>` :
    `<div class="products-container__card-buttons">
              <button
                class="products-container__card-button main-button"
                type="button"
                ${ATTRIBUTES.PRODUCT_ID}="${id}"
                ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.REMOVE}"
              >
                -1
              </button>
              <span class="products-container__card-quantity">${quantity}</span>
              <button
                class="products-container__card-button main-button"
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