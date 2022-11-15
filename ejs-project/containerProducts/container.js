class Container {
    constructor() {
        this.products = [];
        this.id = 0;
    };

    async save(name, price, inStock) {
        try {
            this.id += 1;
            const newProduct = {
                name: name,
                price: price,
                inStock: inStock,
                id: this.id
            };
            this.products.push(newProduct);
            return this.products;
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
            return null
        }
    };

    async getByid(req, res) {
        try {
            const { id } = req.params;
            const idParam = parseInt(id);
            const findProduct = this.getAll.find( el => el.id === idParam);
            res.send(findProduct);
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
            return null;
        }
    };

    get getAll() {
        try {
            return (this.products);
        }
        catch (err) {
            console.log(`Method ERR! ${err}`);
            return [];
        }
    };

    async updateById(req, res) {
        try {
            const { name, price, inStock } = req.body;
            const { id } = req.params;
            const idParam = parseInt(id);
            let get = this.getAll;
            const createProduct = {name, price, inStock, "id": idParam};
            const findProductByIndex = get.findIndex(el => el.id === idParam);
            if (findProductByIndex !== -1) {
                get[findProductByIndex] = createProduct; 
            }
            else {
                res.send(`ERR! Product with ${idParam} does not exist.`)
            }
            res.send(get);
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
            return null;
        }
    }

    async deleteById(req, res) {
        try {
            const { id } = req.params;
            const idParam = parseInt(id);
            let get = this.getAll;
            const filterProducts = get.filter(e => e.id !== idParam);
            if( filterProducts.length === 1) {
                get = filterProducts;
                res.send(get);
            }
            else {
                res.send(`ERR! Product with ${idParam} does not exist. `);
            }
            
        }
        catch(err) {
            console.log(`Reading ERR! ${err}`);
            return null;
        }
    };

    async deleteAll() {
        try {
            const get = this.getAll;
            while (get.length > 0) {
                get.pop();
            };
            return get;
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
        }
    };

    async getRandom() {
        try {
            const get = this.getAll;
            const randomItem = Math.floor(Math.random()*get.length);
            const getRandom = get[randomItem];
            return getRandom;
        }
        catch (err) {
            console.log(`Reading ERR! ${err}`);
        }
    };
};

module.exports = Container;