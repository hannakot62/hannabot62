import axios from 'axios'

export const pictureRequest = async searchQuery => {
    let pictureURL = ''
    const randPage = Math.floor(Math.random() * 99) + 1
    await axios
        .get(
            `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=80&page=${randPage}`,
            {
                headers: {
                    Authorization: process.env.PICTURES_ACCESS_TOKEN
                }
            }
        )
        .then(function (response) {
            // обработка успешного запроса
            const rand = Math.floor(Math.random() * 80)
            pictureURL = response.data.photos[rand].src.medium
        })
    return pictureURL
}
