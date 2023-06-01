import axios from 'axios'

export const pictureRequest = async searchQuery => {
    let pictureURL = ''
    await axios
        .get(
            `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1`,
            {
                headers: {
                    Authorization: process.env.PICTURES_ACCESS_TOKEN
                }
            }
        )
        .then(function (response) {
            // обработка успешного запроса
            console.log(response.data)
            pictureURL = response.data.photos[0].url
        })
    return pictureURL
}
