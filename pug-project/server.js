const express = require('express');
const app = express();
const Container = require('./containerProducts/container');
const container1 = new Container();
const routerProducts = express.Router()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/products', routerProducts);

app.set("views", (__dirname, "views"));
app.set('view engine', 'pug');

let display = true;

app.get('/', (req, res) => {
    display = true;
    res.render('index', {display});
});

routerProducts.get('/', (req, res) => {
    display = false;
    const products = [container1.getAll];
    console.log("Get products: ",products);
    res.render('index', {display, products});
});

routerProducts.post('/', async (req, res) => {
    const promiseProducts = async function () {
        const { name, price, inStock } = await req.body;
        const products = container1.save(name, price, inStock);
        return sendProducts(products);
    };

    const sendProducts = async (products) => {
        Promise.all([ products ])
            .then((values) => {
                const products = values;
                display = false;
                console.log("New product: ",products);
                res.render('index', {display, products})
            });
    };
    
    promiseProducts();
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(
        `Server started on PORT http://127.0.0.1:${PORT} at ${new Date().toLocaleString()}`
    );
});

server.on('error', error => console.log(`ERR! ${error}`));