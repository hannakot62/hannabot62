import axios from 'axios'

export const pictureRequest = async searchQuery => {
    let pictureURL = ''
    const randPage = Math.floor(Math.random() * 99)
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
            console.log(response.data)
            const rand = Math.floor(Math.random() * 79)
            pictureURL =
                response.data.photos[rand].src.large ??
                response.data.photos[rand].src.medium
        })
    return pictureURL
}
