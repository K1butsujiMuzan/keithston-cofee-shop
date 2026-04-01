import {ATTRIBUTES, BUTTON_TYPES} from "./constants.js";

export const basketTemplate = (id, title, price, image) => `
  <li class="basket__list-item">
    <img
      class="basket__list-image"
      src="./assets/images/products/${image}"
      alt="${title}"
      width="360"
      height="360"
      loading="lazy"
    />
    <h2 class="basket__list-title">${title}</h2>
    <span class="basket__list-price">$${price}</span>
    <button
      class="basket-remove"
      type="button"
      aria-label="remove item from basket"
      ${ATTRIBUTES.PRODUCT_ID}="${id}"
      ${ATTRIBUTES.BUTTON_TYPE}="${BUTTON_TYPES.REMOVE}"
    >
      <svg
        aria-hidden="true"
        role="img"
        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4186 11.9999L4.5 18.3131L6.08138 20L12 13.6868L17.9186 20L19.5 18.3131L13.5814 11.9999L19.4999 5.68682L17.9184 4L12 10.313L6.08155 4L4.50018 5.68682L10.4186 11.9999Z" fill="#080341"/>
      </svg>
    </button>
  </li>
`

export const basketEmpty = `
  <li class="basket__list-empty">The cart is empty :(</li>
`