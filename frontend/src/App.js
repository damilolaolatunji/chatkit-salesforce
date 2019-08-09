import React from 'react';
import { handleInput, joinChat, sendMessage } from './methods.js';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      company: "",
      currentRoom: null,
      currentUser: null,
      messages: [],
      newMessage: "",
    }

    this.handleInput = handleInput.bind(this);
    this.joinChat = joinChat.bind(this);
    this.sendMessage = sendMessage.bind(this);
  }

  render() {
    const { currentUser, messages, newMessage } = this.state;

    const messageList = messages.map(message => {
      const arr = message.parts.map(p => {
        return (
          <span className="message-text">{p.payload.content}</span>
        );
      });

      return (
        <li className="message" key={message.id}>
          <div>
            <span className="user-id"><strong>{message.sender.name}: </strong></span>
            {arr}
          </div>
        </li>
      )
    });

    return (
      <div className="App">
        {!currentUser ? (
          <div className="login-form">
            <h2>Chat with a Support Agent</h2>
            <form onSubmit={this.joinChat}>
                <label htmlFor="email">Enter your email</label>
                <input onChange={this.handleInput} type="text" id="email" name="email"
                  placeholder="name@example.com" required />
                <label htmlFor="firstName">Enter your first name</label>
                <input onChange={this.handleInput} type="text" id="firstName" name="firstName"
                  placeholder="First name" required />
                <label htmlFor="lastName">Enter your last name</label>
                <input onChange={this.handleInput} type="text" id="lastName" name="lastName"
                  placeholder="Last name" required />
                <label htmlFor="company">Enter your company name</label>
                <input onChange={this.handleInput} type="text" id="company" name="company"
                  placeholder="Company name" required />
                  <button type="submit">Start chatting!</button>
                </form>
              </div>
        ) : (
          <div className="chat-widget">
            <header className="chat-header">
              <h2>Support</h2>
            </header>
            <ul className="chat-messages">
              {messageList}
            </ul>

            <form onSubmit={this.sendMessage} className="message-form">
              <input
                className="message-input"
                autoFocus
                name="newMessage"
                placeholder="Compose your message and hit ENTER to send"
                onChange={this.handleInput}
                value={newMessage}
              />
            </form>
          </div>
          )}
      </div>
    );
  }
}

export default App;
