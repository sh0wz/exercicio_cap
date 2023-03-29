sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("exerciciocap.controller.productList", {
            onInit: function () {
                
            },

            onSearch : function(oEvent) {
                //var sQuery = oEvent.getParameter("query");
                var id = this.getView().byId("fNo");
                var name = this.getView().byId("fName");

                var globalFilter; 
                
                if(id.mProperties.value && name.mProperties.value){
                    globalFilter = new Filter([ new Filter("CategoryName", FilterOperator.Contains, name.mProperties.value),
                                                new Filter("CategoryID", FilterOperator.EQ, id.mProperties.value)], true);
                }else if(id.mProperties.value){
                    globalFilter = new Filter("CategoryID", FilterOperator.EQ, id.mProperties.value);
                }else{
                    globalFilter = new Filter("CategoryName", FilterOperator.Contains, name.mProperties.value);
                }
    
                this.byId("productTable").getBinding("items").filter(globalFilter);
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
