import {BurgerMenu } from "./classes/burger-menu.js";
import {Products} from "./classes/products.js";
import {getProducts} from "./services/products.js";

new BurgerMenu()
const [products, categories] = await getProducts()
new Products(products, categories)