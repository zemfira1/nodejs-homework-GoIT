const mongoose = require("mongoose");
const { connect } = require("mongoose");
const { app } = require("./app");
const path = require("path");
const configPath = path.join(__dirname, ".env");
require("dotenv").config({ path: configPath });

const { PORT, DB_HOST, ELASTICEMAIL_API_KEY, ELASTICEMAIL_FROM } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const ElasticEmail = require("@elasticemail/elasticemail-client");

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [new ElasticEmail.EmailRecipient("sicira5219@undewp.com")],
  Content: {
    Body: [
      ElasticEmail.BodyPart.constructFromObject({
        ContentType: "HTML",
        Content: "My test email content ;)",
      }),
    ],
    Subject: "Test email",
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
api.emailsPost(email, callback);
