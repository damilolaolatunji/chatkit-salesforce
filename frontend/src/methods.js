import axios from 'axios';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import randomWords from 'random-words';

function handleInput(event) {
  const { value, name } = event.target;

  this.setState({
    [name]: value
  });
}

function createRoom() {
  const { currentUser } = this.state;

  currentUser
    .createRoom({
      name: randomWords({ exactly: 2, join: ' ' }),
      private: true
    })
    .then(room => connectToRoom.call(this, room.id))
    .catch(console.error);
};

function connectToRoom(id) {
  const { currentUser } = this.state;

  return currentUser
    .subscribeToRoomMultipart({
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          });
        },
      }
    })
    .then(currentRoom => {
      this.setState({
        currentRoom
      });
    });
}

function joinChat(event) {
  event.preventDefault();

  const { email, firstName, lastName, company } = this.state;

  if (email.trim() === "") {
    alert("A valid email address is required");
  } else {
    axios
      .post("http://localhost:5200/users", { email, firstName, lastName, company })
      .then(() => {
        const tokenProvider = new TokenProvider({
          url: "<your token provider>"
        });

        const chatManager = new ChatManager({
          instanceLocator: "<your chatkit instance locator>",
          userId: email,
          tokenProvider
        });

        return chatManager.connect().then(currentUser => {
          this.setState(
            {
              currentUser,
            },
            () => createRoom.call(this)
          );
        });
      })
      .catch(console.error);
  }
}

function sendMessage(event) {
  event.preventDefault();
  const { newMessage, currentUser, currentRoom } = this.state;

  if (newMessage.trim() === "") return;

  currentUser.sendSimpleMessage({
    roomId: `${currentRoom.id}`,
    text: newMessage
  });

  this.setState({
    newMessage: "",
  });
}

export {
  handleInput,
  joinChat,
  sendMessage,
}
