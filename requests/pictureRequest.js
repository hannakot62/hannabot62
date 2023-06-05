import axios from 'axios'

export const pictureRequest = async searchQuery => {
    let pictureURL = ''
    await axios
        .get(
            `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=80`,
            {
                headers: {
                    Authorization: process.env.PICTURES_ACCESS_TOKEN
                }
            }
        )
        .then(function (response) {
            // обработка успешного запроса
            console.log(response.data)
            const rand = Math.floor(Math.random() * 80)
            pictureURL = response.data.photos[rand].url
        })
    return pictureURL
}
