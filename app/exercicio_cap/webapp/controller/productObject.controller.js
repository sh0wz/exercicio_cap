sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataListBinding"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataListBinding) {
        "use strict";

        return Controller.extend("exerciciocap.controller.productObject", {
            onInit: function () {
                var router = this.getOwnerComponent().getRouter();

                router.getRoute('product').attachPatternMatched(this._onObjectMached, this);
              
            },
            onNavBack : function () {
               
                var router = this.getOwnerComponent().getRouter();

                router.navTo("productList", {});

            },

            _onObjectMached: function (oEvent){

                var oPath = window.decodeURIComponent(oEvent.getParameter('arguments').ProductID);

                var page = this.getView().byId("page");

                page.setBusy(true);

                this.getView().bindElement({ path: "/" + oPath,
                  parameters: { expand: "Products" },
                  events: { dataReceived: function(oEvent2){
                        page.setBusy(false);
                    }}
                });

            },

            statusStock: function (unitsStock) {
                
                if (unitsStock > 50) {
                    return "Success";
                } else if (unitsStock <= 0 ){
                    return "Error";
                }else{
                    return "Warning";
                }
            }

            
            
        });
    });
