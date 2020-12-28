const API_URL = 'https://randomuser.me/api/?password=upper,lower,number&inc=gender,name,nat,email,picture,nat,login&nat=gb,es'

const NUM_USERS = 25
const axios = require('axios')

require('dotenv').config()
require('../configs/db.config')
const User = require('../models/user.model')


const postData = (url, numResults) => {
    const params = {
        method: 'get',
        responseType: 'json'
    }
    params.url = (numResults ? `${url}&results=${numResults}` : url)
    axios(params)
        .then(({data}) => {
            const users = data.results.map(user => new User({
                email: user.email,
                name: user.name.first,
                lastname: user.name.last,
                language: user.nat == 'ES' ? 'es-ES' : 'en-EN',
                avatar: user.picture.large,
                password: 'TEst1234*',
                username: user.login.username,
                isNew: true
            }))
            console.log(users)
            const newUsers = new User(users)
            User.create(users)
                .then(res => console.log({status: 'OK', response: res}))
            
        })
        .catch(error => {
            console.error(error => console.log({status: 'KO', error}))
        })
}

postData(API_URL, NUM_USERS)