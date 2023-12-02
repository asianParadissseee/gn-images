const {generateMeta, generateImage} = require('./controllers/openai.controller')
const express = require("express")
require("dotenv").config()

const app = express()
const PORT = process.env["PORT"]

app.listen(PORT, () => console.log(`listen port ${PORT}`))

app.use(express.json())

app.post("/openai/meta", generateMeta)
app.post("/openai/image", generateImage)
