const cds = require('@sap/cds');

class ProductService extends cds.ApplicationService {
    init(){
        const Product = require("./Product")
        Product.init(this);
    }
}

module.exports = ProductService;