import { BurgerMenu } from './classes/burger-menu.js'
import { Products } from './classes/products.js'
import { getProducts } from './services/products.js'

new BurgerMenu()
const [products, categories] = await getProducts()
if (products.length > 0 && categories.length > 0) {
  new Products(products, categories)
}
