export const getProducts = async () => {
  try {
    const response = await fetch(
      'https://k1butsujimuzan.github.io/keithston-cofee-shop/products.json',
    )
    if (!response.ok) {
      console.error('Something went wrong, status: ', response.status)
      return [[], []]
    }
    const data = await response.json()
    if (Array.isArray(data)) {
      const categories = new Set(data.map((item) => item.type))
      return [data, [...categories.keys()]]
    }
    return [[], []]
  } catch (error) {
    console.error(error)
    return [[], []]
  }
}
