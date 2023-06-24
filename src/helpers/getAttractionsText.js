import { checkIfArrayBadResponse } from '#helpers'

export function getAttractionsText(attractions) {
    let text = ''

    const result = checkIfArrayBadResponse(attractions)
    if (result) return result

    attractions.forEach(attraction => {
        if (attraction.properties.name) {
            let item = `<b><em>⭐${attraction.properties.name}</em></b>
📍Координаты: ${attraction.geometry.coordinates[0]}, ${attraction.geometry.coordinates[1]}

`
            text += item
        }
    })

    return text
}
