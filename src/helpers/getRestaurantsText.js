import { checkIfArrayBadResponse } from '#helpers'

export function getRestaurantsText(restaurants) {
    let text = ''
    const result = checkIfArrayBadResponse(restaurants)
    if (result) return result
    const filtered = restaurants.filter(rest => +rest.rating > 4)
    if (filtered.length === 0) return 'У всех заведений рейтинг меньше 4...'

    filtered.forEach(rest => {
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
