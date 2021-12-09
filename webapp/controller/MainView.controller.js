sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
	 */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("logaligroup.fiori.controller.MainView", {
            onInit: function () {
                let oJSONModel = new JSONModel();
                let oView = this.getView();
                let i18nBundle = oView.getModel("i18n").getResourceBundle();

                // let oJSON = {
                //     employeeId: "12345",
                //     countryKey: "UK",
                //     listCountry: [
                //         {
                //             key: "US",
                //             text: i18nBundle.getText("countryUS")
                //         },
                //         {
                //             key: "UK",
                //             text: i18nBundle.getText("countryUK")
                //         },
                //         {
                //             key: "ES",
                //             text: i18nBundle.getText("countryES")
                //         },
                //     ]
                // };

                // oJSONModel.setData(oJSON);
                oJSONModel.loadData("../localService/mockdata/Employees.json", false);
                // oJSONModel.attachRequestCompleted(function (oEventModel) {
                //     console.log(JSON.stringify(oJSONModel.getData()));
                // });
                oView.setModel(oJSONModel);
            },

            onFilter: function () {
                let oJSON = this.getView().getModel().getData();

                let filters = [];
                if (oJSON.EmployeeId !== "") {
                    filters.push(new Filter("EmployeeID", FilterOperator.EQ,oJSON.EmployeeId ));
                }
                if (oJSON.CountryKey !== "") {
                    filters.push(new Filter("Country", FilterOperator.EQ,oJSON.CountryKey ));
                }
                //se obtienen datos de la tabla
                let oList = this.getView().byId("tableEmployee");
                let oBinding = oList.getBinding("items");
                oBinding.filter(filters);

            },

            onClearFilter: function () {
                let oModel = this.getView().getModel();
                oModel.setProperty("/EmployeeId", "");
                oModel.setProperty("/CountryKey", "");
            },

            showPostalCode: function (oEvent) {
                let itemPressed = oEvent.getSource();
                let oContext = itemPressed.getBindingContext();
                let objectContext = oContext.getObject();

                sap.m.MessageToast.show(objectContext.PostalCode);
            },

            onValidate: function () {
                let inputEmployee = this.getView().byId("inputEmployee");
                let valueEmployee = inputEmployee.getValue();

                if (valueEmployee.length === 6) {
                    //inputEmployee.setDescription("OK");
                    this.getView().byId("labelCountry").setVisible(true);
                    this.getView().byId("slCountry").setVisible(true);
                } else {
                    //inputEmployee.setDescription("Not OK");
                    this.getView().byId("labelCountry").setVisible(false);
                    this.getView().byId("slCountry").setVisible(false);
                }
            },
        });
    });
