const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatApp'

mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .then(resp => console.info({status: 'OK', message: 'Connected'}))
    .catch(error => console.error({status: 'KO', message: 'Not Connected', error}))