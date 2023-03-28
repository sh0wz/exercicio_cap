sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, ODataModel, Filter, FilterOperator, MessageToast) {
        "use strict";

        return Controller.extend("exerciciocap.controller.productList", {
            onInit: function () {

                //var oModel = new ODataModel("/product/Product");

                //var oView = this.getView();

                //oView.setModel(oModel, "Application");

            },

            onSearch : function(oEvent) {
                var sQuery = oEvent.getParameter("query");

                var id = this.getView().byId("fNo");
                var name = this.getView().byId("fName");

                var globalFilter; 
                
                if(id.mProperties.value && name.mProperties.value){
                    globalFilter = new Filter([ new Filter("ProductName", FilterOperator.Contains, name.mProperties.value),
                                                new Filter("ProductID", FilterOperator.EQ, id.mProperties.value)], true);
                }else if(id.mProperties.value){
                    globalFilter = new Filter("ProductID", FilterOperator.EQ, id.mProperties.value);
                }else{
                    globalFilter = new Filter("ProductName", FilterOperator.Contains, name.mProperties.value);
                }

                    

                
                
                //if (sQuery) {
                    //globalFilter = new Filter([
                    //    new Filter("ProductName", FilterOperator.Contains, sQuery),
                    //    new Filter("Category", FilterOperator.Contains, sQuery)
                    //    ], false
                    //);
                    //var globalFilter = new Filter("ProductName", FilterOperator.Contains, sQuery);
                    this.byId("productTable").getBinding("items").filter(globalFilter);
                   // MessageToast.show(sQuery);
                //}  
            },

            onPress: function (oEvent) {
                var oItem = oEvent.getSource();
                var oBindingContext = oItem.getBindingContext();

                var router = this.getOwnerComponent().getRouter();
                router.navTo("product",{
                    ProductID : oBindingContext.sPath.substr(1)
                });
            },

            onlyInteger: function (oEvent) {
                var value = oEvent.getSource().getValue().replace(/[^\d]/g, '');
                oEvent.getSource().setValue(value);
            }


        });
    });
