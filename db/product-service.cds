namespace com.cs4.manage.product;

entity Product {
    key ProductID       : Integer;
        ProductName     : String;
        SupplierID      : Integer;
        CategoryID      : Integer;
        QuantityPerUnit : String;
        UnitPrice       : Decimal(10,4);
        UnitsInStock    : Integer;
        UnitsOnOrder    : Integer;
        ReorderLevel    : Integer;
        Discontinued    : Boolean;
}
