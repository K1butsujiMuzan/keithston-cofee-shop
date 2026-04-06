import { BUTTON_TYPES } from './constants.js'

export const categoryTemplate = (value, isCurrent) => `
  <li class="products__categories-item">
    <button
      class="products__categories-button ${isCurrent ? 'active' : ''}"
      type="button"
      ${BUTTON_TYPES.CATEGORY}="${value}"
    >
      ${value[0].toUpperCase() + value.slice(1)}
    </button>
  </li>
`
