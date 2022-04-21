const BASE_URL = 'https://example.com/';

function processResponse(response) {
  return response.json();
}

function fetchRequest(url) {
  return fetch(url)
    .then(processResponse);
}

function requestOverviewData(dashboard) {
  const url = `${BASE_URL}${dashboard}/overview`;
  return fetchRequest(url);
}

function requestIndicatorData(dashboard) {
  const url = `${BASE_URL}${dashboard}/indicators`;
  return fetchRequest(url);
}

function requestIndicatorFactorsData(dashboard) {
  const url = `${BASE_URL}${dashboard}/factors`;
  return fetchRequest(url);
}

function requestIndicatorComparisonssData(dashboard) {
  const url = `${BASE_URL}${dashboard}/comparisons`;
  return fetchRequest(url);
}

function requestExportData(dashboard) {
  const url = `${BASE_URL}${dashboard}/export`;
  return fetchRequest(url);
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
  const url = `${BASE_URL}/meta`;
  return fetchRequest(url);
}

function requestExport() {
  const url = `${BASE_URL}/export`;
  return fetchRequest(url);
}

function requestTemplateAdd() {
  const url = `${BASE_URL}/meta/templates/add`;
  return fetchRequest(url);
}

function requestTemplateRemove() {
  const url = `${BASE_URL}/meta/templates/remove`;
  return fetchRequest(url);
}

function requestTemplateApply() {
  const url = `${BASE_URL}/meta/templates/apply`;
  return fetchRequest(url);
}

function processDataRequest({ detail }) {
  return requestData(detail);
}

function processMetaRequest({ detail }) {
  return requestMeta(detail);
}

function processExportRequest({ detail }) {
  return requestExport(detail);
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
  sendDataResponse(event)
}

function onMetaRequest(event) {
  console.log("ERROR", event)
  sendMetaResponse(event)
}

function onExportRequest(event) {
  sendExportResponse(event)
}

function onTemplateActionRequest() {
  sendTemplateAtionResponse(event)
}

async function processEventRequest({ detail }) {
  const { key, uuid, ...data } = detail;
  const { dashboard } = data;
  console.log("DATA", key, uuid, data, dashboard)
  sendResponse(data, uuid)
}

async function onEventRequest(event) {
  await processEventRequest(event)
}

function subscribeRequests() {
  window.addEventListener('eventrequest', onEventRequest)
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
