(function () {
  'use strict';

  function dispatchResponseEvent(data, name) {
    const event = new CustomEvent(name, { detail: data });
    window.dispatchEvent(event);
  }

  function dispatchReadyEvent() {
    const event = new CustomEvent('proxyready');
    window.dispatchEvent(event);
  }

  function sendResponse(data, name = 'dataresponse') {
    dispatchResponseEvent(data, name);
  }

  function sendDataResponse(data) {
    sendResponse(data);
  }

  function sendMetaResponse(data) {
    sendResponse(data, 'metaresponse');
  }

  function sendExportResponse(data) {
    sendResponse(data, 'exportresponse');
  }

  function sendTemplateAtionResponse(data) {
    sendResponse(data, 'templateactionresponse');
  }

  function onDataRequest(event) {
    sendDataResponse(event);
  }

  function onMetaRequest(event) {
    console.log("ERROR", event);
    sendMetaResponse(event);
  }

  function onExportRequest(event) {
    sendExportResponse(event);
  }

  function onTemplateActionRequest() {
    sendTemplateAtionResponse(event);
  }

  async function processEventRequest({ detail }) {
    const { key, uuid, ...data } = detail;
    const { dashboard } = data;
    console.log("DATA", key, uuid, data, dashboard);
    sendResponse(data, uuid);
  }

  async function onEventRequest(event) {
    await processEventRequest(event);
  }

  function subscribeRequests() {
    window.addEventListener('eventrequest', onEventRequest);
    window.addEventListener('datarequest', onDataRequest);
    window.addEventListener('metarequest', onMetaRequest);
    window.addEventListener('exportrequest', onExportRequest);
    window.addEventListener('templateactionrequest', onTemplateActionRequest);
  }

  function initProxy() {
    subscribeRequests();
    dispatchReadyEvent();
  }

  initProxy();

}());
//# sourceMappingURL=proxyDev.js.map
