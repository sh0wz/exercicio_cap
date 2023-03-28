"use strict";
var axios = require("axios");

const init = async function (srv) {

    srv.on("READ", "Product", async function (req) {

        var url = 'https://services.odata.org/v2/northwind/northwind.svc/Products';

        if(req._queryOptions.$filter){

            var indexStart = req._queryOptions.$filter.indexOf(',');
            var indexEnd = req._queryOptions.$filter.indexOf(')');

            var substring = 'substringof(' + req._queryOptions.$filter.substring(indexStart+1, indexEnd) +  ',ProductName) eq true';

            var filter = "/?$filter=" + substring ;
            
        }
        if(req.data.ProductID){

            var id = '(' + req.data.ProductID + ')';

        }

        if(filter){
            url += filter;
        }else if(id){
            url += id;
        }

        var products = await axios.get(url);

        var productList = [];
        

        if(products.data.d.results){

            products.data.d.results.forEach(product => {
                productList.push({
                    ProductID       : product.ProductID,
                    ProductName     : product.ProductName,
                    SupplierID      : product.SupplierID,
                    CategoryID      : product.CategoryID,
                    QuantityPerUnit : product.QuantityPerUnit,
                    UnitPrice       : product.UnitPrice,
                    UnitsInStock    : product.UnitsInStock,
                    UnitsOnOrder    : product.UnitsOnOrder,
                    ReorderLevel    : product.ReorderLevel,
                    Discontinued    : product.Discontinued
                });
            });

        }else{

            productList.push({
                ProductID       : products.data.d.ProductID,
                ProductName     : products.data.d.ProductName,
                SupplierID      : products.data.d.SupplierID,
                CategoryID      : products.data.d.CategoryID,
                QuantityPerUnit : products.data.d.QuantityPerUnit,
                UnitPrice       : products.data.d.UnitPrice,
                UnitsInStock    : products.data.d.UnitsInStock,
                UnitsOnOrder    : products.data.d.UnitsOnOrder,
                ReorderLevel    : products.data.d.ReorderLevel,
                Discontinued    : products.data.d.Discontinued
            });

        }

        return productList;

       });

}

module.exports = {
    init: init
}