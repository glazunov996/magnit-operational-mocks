(function () {
  'use strict';

  function processResponse(response) {
    return {};
  }

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function fetchRequest(url) {
    return delay(1000)
      .then(processResponse);
  }

  function requestOverviewData(dashboard) {
    return fetchRequest();
  }

  function requestIndicatorData(dashboard) {
    return fetchRequest();
  }

  function requestIndicatorFactorsData(dashboard) {
    return fetchRequest();
  }

  function requestIndicatorComparisonssData(dashboard) {
    return fetchRequest();
  }

  function requestExportData(dashboard) {
    return fetchRequest();
  }

  function requestData(request) {
    if (request.detail) {
      if (request.detail === 'comparisons') return requestIndicatorComparisonssData(request.dashboard);
      return requestIndicatorFactorsData(request.dashboard);
    } else if (request.indicator) {
      if (request.indicator === 'export') return requestExportData(request.dashboard);
      return requestIndicatorData(request.dashboard);
    }
    return requestOverviewData(request.dashboard);
  }

  function requestMeta() {
    return fetchRequest();
  }

  function requestExport() {
    return fetchRequest();
  }

  function requestTemplateAdd() {
    return fetchRequest();
  }

  function requestTemplateRemove() {
    return fetchRequest();
  }

  function requestTemplateApply() {
    return fetchRequest();
  }

  function processDataRequest({ detail }) {
    return requestData(detail);
  }

  function processMetaRequest({ detail }) {
    return requestMeta();
  }

  function processExportRequest({ detail }) {
    return requestExport();
  }

  function processTemplateActionRequest({ detail }) {
    if (detail.action === 'remove') return requestTemplateRemove();
    else if (detail.action === 'add') return requestTemplateAdd();
    return requestTemplateApply();
  }

  function dispatchResponseEvent(data, name) {
    const event = new CustomEvent(name, { detail: data });
    window.dispatchEvent(event);
  }

  function dispatchErrorEvent(error) {
    const event = new CustomEvent('error', { detail: error });
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

  function sendError(error) {
    dispatchErrorEvent(error);
    console.error(error);
  }

  function onDataRequest(event) {
    processDataRequest(event)
      .then(sendDataResponse)
      .catch(sendError);
  }

  function onMetaRequest(event) {
    console.log("ERROR", event);
    processMetaRequest(event)
      .then(sendMetaResponse)
      .catch(sendError);
  }

  function onExportRequest(event) {
    processExportRequest(event)
      .then(sendExportResponse)
      .catch(sendError);
  }

  function onTemplateActionRequest() {
    processTemplateActionRequest(event)
      .then(sendTemplateAtionResponse)
      .catch(sendError);
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
