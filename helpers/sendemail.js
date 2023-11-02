const ElasticEmail = require("@elasticemail/elasticemail-client");
const path = require("path");
const configPath = path.join(__dirname, "..", ".env");
require("dotenv").config({ path: configPath });

const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_FROM } = process.env;

const sendemail = (data) => {
  const defaultClient = ElasticEmail.ApiClient.instance;

  const { apikey } = defaultClient.authentications;
  apikey.apiKey = ELASTICEMAIL_API_KEY;

  const api = new ElasticEmail.EmailsApi();

  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(data.to)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: data.html,
        }),
      ],
      Subject: data.subject,
      From: ELASTICEMAIL_FROM,
    },
  });

  const callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
    }
  };

  return api.emailsPost(email, callback);
};

module.exports = { sendemail };
