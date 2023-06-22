import { checkIfArrayBadResponse } from './checkIfArrayBadResponse.js'

export function getRestaurantsText(restaurants) {
    let text = ''

    const result = checkIfArrayBadResponse(restaurants)
    if (result) return result

    restaurants = restaurants.filter(rest => +rest.rating > 4)

    restaurants.forEach(rest => {
        let item = `
<b>🍽️ ${rest.name} 🍽️</b>
Рейтинг: ${rest.rating} ⭐
${rest.price_level ? `Цены: ${rest.price_level} 💰` : ``}
📍Координаты: ${rest.latitude}, ${rest.longitude}
✏️Страница на Trip Advisor: ${rest.web_url}

`
        text += item
    })
    return text
}
