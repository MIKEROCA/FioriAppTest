sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",    
],

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
    function (Controller, JSONModel) {
        //'use strict';

        return Controller.extend("logaligroup.fiori.controller.Main", {

            onInit: function () {
                let oView = this.getView();

                let oJSONModelEmpl = new JSONModel();
                oJSONModelEmpl.loadData("../localService/mockdata/Employees.json", false);
                oView.setModel(oJSONModelEmpl, "jsonEmployees");

                let oJSONModelCountries = new JSONModel();
                oJSONModelCountries.loadData("../localService/mockdata/Countries.json", false);
                oView.setModel(oJSONModelCountries, "jsonCountries");
                
                let oJSONModelLayout = new JSONModel();
                oJSONModelLayout.loadData("../localService/mockdata/Layouts.json", false);
                oView.setModel(oJSONModelLayout, "jsonLayout");                

                let oJSONModelConfig = new JSONModel({
                    visibleID: true,
                    visibleName: true,
                    visibleCountry: true,
                    visibleCity: false,
                    visibleBtnShowCity: true,
                    visibleBtnHideCity: false,
                });
                oView.setModel(oJSONModelConfig, "jsonModelConfig");

                //subscribción del evento
                this._bus = sap.ui.getCore().getEventBus();
                this._bus.subscribe("flexible", "showEmployee", this.showEmployeeDetails, this);
            },

            showEmployeeDetails: function (category, nameEvent, path) {
                let detailView = this.getView().byId("detailEmployeeView");
                detailView.bindElement("jsonEmployees>" + path);
                this.getView().getModel("jsonLayout").setProperty("/ActiveKey", "TwoColumnsMidExpanded");
            }

        });
    });