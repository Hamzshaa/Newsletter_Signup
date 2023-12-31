const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  // const API_KEY = "3b0a96588cf87a8f476dc0e2a05fcb30-us11";

  const url = "https://us11.api.mailchimp.com/3.0/lists/2ad80fc4bc";
  // const ap = process.env.API_KEY;
  const api = "3b0a96588cf87a8f476dc0e2a05fcb30-us11";
  console.log(api);
  const option = {
    method: "POST",
    auth: `trident1:${api}`,
  };

  const request = https.request(url, option, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3333, () => {
  console.log("Server is listening on port 3333.", process.env.API_KEY);
});

// a8264cdd7bae1dfa520576fe917afdac-us11
//daf381b6461fc9c1e4b195ffa440fb49-us11
//922c3a999cc57c3ab7690cf98a2b6423-us11
// e9518f5933e5549c35a9d5b9dbf1fb95-us11

// list id
// 2ad80fc4bc
