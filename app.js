const readline = require('readline')
const {generateMeta, generateImage} = require('./controllers/openai.controller')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// rl.question("YouTube Video Title: \n", (title) => generateMeta(title))
rl.question('Describe your Youtube thumbnail: \n', (desc) => generateImage(desc))
