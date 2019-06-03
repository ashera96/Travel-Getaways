var axios = require("axios");
var fetch = require("node-fetch");
var URL = "https://api.dialogflow.com/v1/";
var accessToken = "0dc2512b43d94dbc9b08d3b94e194135";

let config = {
  headers: {
    Authorization: "Bearer " + "4c52dfb9db614559884272d594eefa50",
    "Content-Type": "application/json"
  }
};
var bodyParameters = {
  queryInput: { text: {} },
  query: "",
  languageCode: "en",
  sessionId: "12345",
  timezone: "Asia/Colombo"
};
module.exports.getReply = function getReply(res, query) {
  bodyParameters.query = query;
  console.log(bodyParameters);
  fetch(URL + "query?v=20150910", {
    body: JSON.stringify({
      query: query,
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
      res.send({ result: data.result.fulfillment.speech });
      return data.result.fulfillment.speech;
    })
    .catch(error => console.error(error));
};
