var axios = require("axios");
var fetch = require("node-fetch");
var URL = "https://api.dialogflow.com/v1/";
var accessToken = "1711e3ba3d34422e996b97d965699e99";

let config = {
  headers: {
    Authorization: "Bearer " + "4c52dfb9db614559884272d594eefa50",
    "Content-Type": "application/json"
  }
};
var bodyParameters = {
  queryInput: { text: {} },
  query: "hi hello",
  languageCode: "en",
  sessionId: "12345",
  timezone: "Asia/Colombo"
};
function getReply(query) {
  this.bodyParameters.query = query;
  fetch(URL + "query?v=20150910", {
    body: JSON.stringify({
      query: "new york city",
      lang: "en",
      sessionId: "12345"
    }),
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + accessToken
    },
    method: "POST"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.result.fulfillment.speech);
      return data.result.fulfillment.speech;
    })
    .catch(error => console.error(error));
}
