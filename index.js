const PORT = process.env.PORT || 8000
const axios = require('axios')      // webscraper
const cheerio = require('cheerio')  // pickups certain HTML-elements
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.static('public'))   


                                    //locating my frontend to vercel
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '/public/')});
  })

  app.get('/', (req, res) => {
    res.sendFile('styles.css', {root: path.join(__dirname, '/public/src/')});
  })

  app.get('/', (req, res) => {
    res.sendFile('app.js', {root: path.join(__dirname, '/public/src/')});
  })
module.exports = app

const url = 'https://www.hltv.org/'
const baseUrl = 'https://www.hltv.org'

// app.METHOD(path, handler).

app.get('/', function (req, res) {
    res.json("this is my webscraper")
})

/*
app.get()                           // get data
app.post()                          // add data
app.put()                           // edit data
app.delete()                        // delete data
*/

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('div.index > div > a ', html).each(function () {
                const title = $(this).find('div.newstext').text()
                const link = baseUrl + $(this).attr('href')
                articles.push({
                    title,
                    link
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))

})



app.listen(PORT, () => console.log("Server is running on port:", PORT))