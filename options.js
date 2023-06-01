export const btnOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                { text: 'bubutton', callback_data: 'bubu' },
                { text: 'bubutton1', callback_data: '1' }
            ],
            [
                { text: 'bubutton2', callback_data: '2' },
                { text: 'bubutton3', callback_data: '3' }
            ],
            [
                { text: 'bubutton4', callback_data: '4' },
                { text: 'bubutton5', callback_data: '5' }
            ],
            [
                { text: 'bubutton6', callback_data: '6' },
                { text: 'bubutton7', callback_data: '7' }
            ]
        ]
    })
}
