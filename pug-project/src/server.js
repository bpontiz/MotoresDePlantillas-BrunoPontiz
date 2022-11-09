const express = require('express');
const routerProducts = express.Router()
const Container = require('../containerProducts/container');
const container1 = new Container();
const app = express();

app.set('views', './views');
app.set ('view engine', 'pug');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/products', routerProducts)

let display = Boolean(true);

app.get('/', (req, res) => {
    display = true;
    res.render('index', {display});
});

routerProducts.get('/',  (req, res) => {
    const products = container1.getAll;
    display = false;
    res.render('index', {products, display});
})

routerProducts.post('/', async (req, res) => { 
    const {name, price, inStock} = await req.body;
    const newProduct = container1.save(name, price, inStock);
    display = true;
    res.render('index', {newProduct, display});
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(
        `Server started on PORT http://127.0.0.1:${PORT} at ${new Date().toLocaleString()}`
    );
});

server.on('error', error => console.log(`ERR! ${error}`));