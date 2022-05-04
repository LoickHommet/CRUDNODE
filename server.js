const { cp } = require('fs')
const http = require('http')

const server = http.createServer((req, res) => {


    let data = ''
    req.on('data', chunk => {
        data += chunk
    });

    req.on('end', () => {
    data = JSON.parse(data)

    res.end()
    })
})