// import OpenAI from "openai"
const OpenAI = require("openai")
require('dotenv').config()


const openai = new OpenAI({
    apiKey: process.env.SECRET_KEY
})

module.exports = openai
