const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

router.use(express.static('public'))

const codingResourcesRoutes = require('./api/codingResourcesRoutes')

router.use('/codingResources', codingResourcesRoutes)

router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/codingresources/codingResources'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'Some Coding Resources For You',
                name: 'Some Coding Resources For You',
                data
            })
        })
})

router.get('*', (req, res) => {
    if (req.url == '/favicon.ico/') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 Error - Resources have stopped working',
            name: '404 Error - Resources have stopped working'
        })
    }
})

module.exports = router