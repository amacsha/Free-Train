//modules imported
const express = require("express")
const cors = require("cors")
const fileUpload = require('express-fileupload')

//port
const port = 3000

//set the cors allowed cors origin
const corsConfig = {
  origin: 'http://localhost:5173'
}

//set up express server
const app = express()

//set up middleware
app.use(cors(corsConfig))
app.use(fileUpload())
app.use(express.json())

app.listen(port, function () {
  console.log("http://localhost:3000")
})
