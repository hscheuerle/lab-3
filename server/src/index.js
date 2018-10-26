const express = require('express')
const app = express()
const { wrapper } = require('../scripts/wrap')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/PostText', (req, res) => {
    const { payload } = req.body
    wrapper(payload, stats => {
        try {
            const py_json = JSON.parse(stats)
            res.json({
                payload: py_json
            })
        } catch (err) {
            console.log(err)
            console.log("probably while trying to parse..")
            console.log(stats)
            res.json({ text: err })
        }

    })
})

app.listen(4000, () => {
    console.log("listening on port 4000")
})