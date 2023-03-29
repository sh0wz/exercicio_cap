using { com.cs4.manage.product as def } from '../db/product-service';

service ProductService {

    entity Product as projection on def.Product;
    entity Category as projection on def.Category;
    
}