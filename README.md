# Send live chat leads to a CRM like Salesforce

Create Salesforce leads automatically from your live chat contacts. Tutorial: https://pusher.com/chat-leads-salesforce

## Getting Started

1. Clone this repository and `cd` into it.
2. Execute `npm install` to download dependencies.
3. See tutorial for notes on how to get the required credentials from Chatkit and Salesforce.
4. Open `frontend/src/methods.js` and update it with your Chatkit credentials.
5. Rename `.env.example` to `.env` and update it with your Chatkit and Salesforce credentials.
6. Run `node server.js` from the project root to start the Express server.
7. `cd` into th `frontend` directory and run `npm install` followed by `npm start` to start the development server. View http://localhost:3000 in your browser.

## Pre-requisites

- [Node.js](https://nodejs.org/en) and npm

## Built With

- [React](https://reactjs.org) - For creating the application frontend
- [Chatkit](https://pusher.com/chatkit) - Chat features
- [Salesforce](https://salesforce.com) - CRM

## Licence

[MIT](https://opensource.org/licenses/MIT)

