sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "logaligroup/fiori/model/formatter"
],

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter) {
        'use strict';

        return Controller.extend("logaligroup.fiori.controller.EmployeeDetails", {

            Formatter: formatter,

            onInit: function () {
                //atributo donde se guarda la instancia  cuando se realice la llamada
                this._bus = sap.ui.getCore().getEventBus();
            },

            onCreateIncidence: function () {
                let tableIncidence = this.getView().byId("tableIncidence");
                let newIncidence = sap.ui.xmlfragment("logaligroup.fiori.fragment.NewIncidence", this);
                let incidenceModel = this.getView().getModel("incidenceModel");
                let odata = incidenceModel.getData();
                let index = odata.length;
                odata.push({ index: index + 1 });
                incidenceModel.refresh();
                newIncidence.bindElement("incidenceModel>/" + index);
                tableIncidence.addContent(newIncidence);
            },

            onDeleteIncidence: function (oEvent) {
                //let tableIncidence = this.getView().byId("tableIncidence");
                //let rowIncidence = oEvent.getSource().getParent().getParent();
                //let incidenceModel = this.getView().getModel("incidenceModel");
                //let odata = incidenceModel.getData();
                //let contextObj = rowIncidence.getBindingContext("incidenceModel");

                //odata.splice(contextObj.index - 1, 1);
                //for (let i in odata) {
                //    odata[i].index = parseInt(i) + 1;
                //};

                //incidenceModel.refresh();
                //tableIncidence.removeContent(rowIncidence);

                //for (let j in tableIncidence.getContent()) {
                //    tableIncidence.getContent()[j].bindElement("incidenceModel>/" + j);
                //};
                let contextObj = oEvent.getSource().getBindingContext("incidenceModel").getObject();
                this._bus.publish("incidence", "onDeleteIncidence", { 
                    IncidenceId: contextObj.IncidenceId, 
                    SapId: contextObj.SapId,
                    EmployeeId: contextObj.EmployeeId
                });
            },

            onSaveIncidence: function (oEvent) {
                let incidence = oEvent.getSource().getParent().getParent();
                let incidenceRow = incidence.getBindingContext("incidenceModel");
                //pasamos el evento a quien va realizar la subscripcion (incidencia seleccionada)
                //let temp = incidenceRow.sPath.replace('/','');
                this._bus.publish("incidence", "onSaveIncidence", { incidenceRow: incidenceRow.sPath.replace('/', '') });
            },

            updateIncidenceCreationDate: function (oEvent) {
               let context = oEvent.getSource().getBindingContext("incidenceModel");
               let contextObj = context.getObject();
               contextObj.CreationDateX = true;
            },

            updateIncidenceReason: function (oEvent) {
                let context = oEvent.getSource().getBindingContext("incidenceModel");
                let contextObj = context.getObject();
                contextObj.ReasonX = true;
            },

            updateIncidenceType: function (oEvent) {
                let context = oEvent.getSource().getBindingContext("incidenceModel");
                let contextObj = context.getObject();
                contextObj.TypeX = true;
            }
        });
    });