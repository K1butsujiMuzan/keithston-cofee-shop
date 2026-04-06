import { BurgerMenu } from './classes/burger-menu.js'
import { getProducts } from './services/products.js'
import { Basket } from './classes/basket.js'

new BurgerMenu()
const [products] = await getProducts()
new Basket(products)
