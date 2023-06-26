import axios from 'axios'
import { PICTURES_ACCESS_TOKEN } from '#environmentVars'
import { oops } from '#vars'
import { pictureURL } from '#urls'

export const pictureRequest = async searchQuery => {
    let pictureSrc = ''
    const randPage = Math.floor(Math.random() * 99)
    await axios
        .get(pictureURL, {
            headers: {
                Authorization: PICTURES_ACCESS_TOKEN
            },
            params: { query: searchQuery, page: randPage, per_page: 80 }
        })
        .then(function (response) {
            // обработка успешного запроса
            const rand = Math.floor(Math.random() * 79)
            pictureSrc =
                response.data.photos[rand].src.large ??
                response.data.photos[rand].src.medium
        })
        .catch(err => {
            return oops
        })
    return pictureSrc
}
