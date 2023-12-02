const openai = require('../config/openai.config.js')
const OpenAI = require("openai");

const generateMeta = async (req, res) => {
    const {title} = req.body
    try {
        const description = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: 'user',
                content: `Come up with a description for a YouTube video called ${title}`
            }],
            max_tokens: 100
        });

        const tags = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: 'user',
                content: `Come up 10 keywords for a YouTube video called ${title}`
            }],
            max_tokens: 100
        });

        res.status(200).json(
            {
                description: description.choices[0].message,
                tags: tags.choices[0].message
            }
        )
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error("AI err " + error.status);  // HTTP status code, e.g., 400
            console.error("AI err " + error.message); // Human-readable error message
            console.error("AI err " + error.code);  // Error code, e.g., 'billing_hard_limit_reached'
            console.error("AI err " + error.type);  // Type of error, e.g., 'invalid_request_error'
        } else {
            console.error(error);
        }
    }
}
const generateImage = async (req, res) => {
    try {
        const image = await openai.images.generate({
            model: "gpt-3.5-turbo",
            prompt: req.body.prompt,
            n: 1,
            size: "512x512"
        })
        res.json({
            url: image.data[0].url
        })
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error('AI err:\n ' + error.status);  // e.g. 401
            console.error('AI err:\n' + error.message); // e.g. The authentication token you passed was invalid...
            console.error('AI err:\n ' + error.code);  // e.g. 'invalid_api_key'
            console.error('AI err:\n ' + error.type);  // e.g. 'invalid_request_error'
        } else {
            console.log(error)
        }
    }
}

module.exports = {generateMeta, generateImage}
