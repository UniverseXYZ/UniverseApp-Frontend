export const formatPrice = (price: string) => {
  return Number(price) < 0.0001 ? '< 0.0001' : price && price.length > 7 ? `> ${price.substring(0, 5)}` : price
}

export const formatSecondaryPrice = (price: string) => {
  return Number(price) < 0.0001 ? '< 0.0001' : price.length > 7 ? Number(price).toFixed(2) : price;
}
