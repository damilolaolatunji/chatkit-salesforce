require('dotenv').config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');
const axios = require('axios');
const qs = require('qs');

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', (req, res) => {
  const { email, firstName, lastName, company } = req.body;
  const username = firstName + " " + lastName;

  chatkit
    .createUser({
      id: email,
      name: username,
      customData: {
        firstName,
        lastName,
        company,
      }
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        console.log(`User already exists: ${email}`);
        res.sendStatus(200);
      } else {
        res.status(err.status).json(err);
      }
    });
});

app.post('/leads', (req, res) => {
  const users = req.body.payload.users;
  users.forEach(user => {
    const leadData = {
      first_name: user.custom_data.firstName,
      last_name: user.custom_data.lastName,
      company: user.custom_data.company,
      email: user.id,
      oid: process.env.SALESFORCE_OID,
    };
    axios({
      method: 'POST',
      url: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
      data: qs.stringify(leadData),
      config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
    })
      .then(response => {
        console.log('res', response.status, response.data);
      })
      .catch(console.error);
  });

  res.sendStatus(200);
});

app.set('port', process.env.PORT || 5200);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

