const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// All Resources
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/codingresources/codingResources'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/codingResources', {
                title: 'All The Resources',
                name: 'All The Resources',
                data
            })
        })
})

// Single Resources
router.get('/:id', (req, res) => {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/codingresources/codingResources/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if (Object.keys(data).length >= 1) {
                res.render('pages/single-resources', {
                    title: `${data.description}`,
                    name: `${data.description}`,
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - The machine took over',
                    name: '404 Error - The machine took over'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})

module.exports = router