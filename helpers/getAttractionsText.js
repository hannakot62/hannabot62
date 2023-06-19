export function getAttractionsText(attractions) {
    let text = ''

    attractions.forEach(attraction => {
        if (attraction.properties.name) {
            let item = `⭐${attraction.properties.name}
📍Координаты: ${attraction.geometry.coordinates[0]}, ${attraction.geometry.coordinates[1]}

`
            text += item
        }
    })
    return text
}
