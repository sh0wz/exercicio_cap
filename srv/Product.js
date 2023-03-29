"use strict";
var axios = require("axios");

const init = async function (srv) {

    srv.on("READ", "Product", async function (req) {

        var url = 'https://services.odata.org/v2/northwind/northwind.svc/Products';

        if(req._queryOptions.$filter){

            if(req._queryOptions.$filter.includes("contains", 0)){

                var indexStart = req._queryOptions.$filter.indexOf(',');
                var indexEnd = req._queryOptions.$filter.indexOf(')');

                var substring = 'substringof(' + req._queryOptions.$filter.substring(indexStart+1, indexEnd) +  ',ProductName) eq true';

                var filter = "/?$filter=" + substring ;

                if(req._queryOptions.$filter.includes("ProductID", 0)){

                    filter += req._queryOptions.$filter.substring(indexEnd+1, req._queryOptions.$filter.length);

                }

            }else{
                url += "/?$filter=" + req._queryOptions.$filter;
            }

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

       srv.on("READ", "Category", async function (req) {

        var url = 'https://services.odata.org/v2/northwind/northwind.svc/Categories';

        if(req._queryOptions && req._queryOptions.$filter){

            if(req._queryOptions.$filter.includes("contains", 0)){

                var indexStart = req._queryOptions.$filter.indexOf(',');
                var indexEnd = req._queryOptions.$filter.indexOf(')');

                var substring = 'substringof(' + req._queryOptions.$filter.substring(indexStart+1, indexEnd) +  ',CategoryName) eq true';

                var filter = "/?$filter=" + substring ;

                if(req._queryOptions.$filter.includes("CategoryID", 0)){

                    filter += req._queryOptions.$filter.substring(indexEnd+1, req._queryOptions.$filter.length);

                }

            }else{
                url += "/?$filter=" + req._queryOptions.$filter;
            }

        }
        if(req.data && req.data.CategoryID){

            var id = '(' + req.data.CategoryID + ')';

        }
    
        if(filter){
            url += filter;
        }else if(id){
            url += id;
        }

        if(req._queryOptions && req._queryOptions.$expand)
        {
            url += '?$expand=Products';
        }

        var categories = await axios.get(url);

        var categoriesList = [];
        

        if(categories.data.d.results){

            categories.data.d.results.forEach(category => {
                //categoriesList.push(category);
                categoriesList.push({
                    CategoryID    : category.CategoryID,
                    CategoryName  : category.CategoryName,
                    Description   : category.Description,
                    Picture       : category.Picture
                });
            });

        }else{

            categoriesList.push({
                CategoryID    : categories.data.d.CategoryID,
                CategoryName  : categories.data.d.CategoryName,
                Description   : categories.data.d.Description,
                Picture       : categories.data.d.Picture,
                Products      : categories.data.d.Products.results
            });

        }

        return categoriesList;

       });

       

}

module.exports = {
    init: init
}