const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express()
const port = 3000
const static_dir = '../public'

app.use(bodyParser.json());
app.use(express.static(static_dir));

app.get('/catalogData', (req, res) => {
    fs.readFile('data/catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {
    fs.readFile('data/cart.json', 'utf8', (err, data) => {
        const cart = JSON.parse(data);
        let id = 1;
        if (cart.length > 0) {
            id = cart[cart.length - 1].id_product + 1;
        }
        const item = req.body;
        item.id_product = id;
        cart.push(item);

        fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
            console.log('done');
            res.end()
        });
    });
});
// !
app.get('/catalogBasket', (req, res) => {
    fs.readFile('data/cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`);
});