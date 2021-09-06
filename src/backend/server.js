const express = require('express')

const app = express()
const mongoose = require('mongoose')
const routeURL = require('./Routes/routes')
const cors = require('cors');
const usermodel = require('./models/SignUpModel')

app.use(cors())

mongoose.connect('mongodb://localhost:27017/hootsuite',{ useNewUrlParser: true , useUnifiedTopology: true},()=>console.log('database connected'))
app.use(express.json())

app.use('',routeURL)




app.listen(4040,()=>console.log('server is up and running'))