import { default as mockMeta } from '../mocks/mockMeta.json';

function dispatchRequestEvent(request) {
  const event = new CustomEvent('metarequest', { detail: request });
  window.dispatchEvent(event);
}

export function requestMeta(request) {
  const promise = new Promise((resolve, reject) => {
    function onRequestResponse(response) {
      window.removeEventListener('metaresponse', onRequestResponse);
      window.removeEventListener('error', onRequestError);
      console.log("META", response.detail)
      resolve(mockMeta)
      //resolve(response.detail);
    }

    function onRequestError() {
      window.removeEventListener('metaresponse', onRequestResponse);
      window.removeEventListener('error', onRequestError);
      reject(new Error('An error occured while making this request'));
    }

    window.addEventListener('metaresponse', onRequestResponse);
    window.addEventListener('error', onRequestError);
  });
  dispatchRequestEvent(request);
  return promise;
}
