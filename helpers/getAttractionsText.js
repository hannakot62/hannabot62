export function getAttractionsText(attractions) {
    let text = ''
    if (!Array.isArray(attractions)) return attractions

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
