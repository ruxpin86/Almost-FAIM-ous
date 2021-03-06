//USED FOR REFERENCE TO REFACTOR INTO nuchat.js

const socket = window.socket
const messageBox = document.getElementById("message-thread");
const sendBtn = document.getElementById("submit");
const chat = document.getElementById("chat");
const userName = document.getElementById("user-name");
const mainContainer = document.getElementById("main-container");

// window.scrollTo(0, Number.POSITIVE_INFINITY);
addSocket();
focusMethod();

function addToChat(user, msg) {
    const div = document.createElement("div");
    div.textContent = `${user}: ${msg}`;
    messageBox.append(div);
    messageBox.scrollTo(0, messageBox.scrollHeight);
    // chat.value = "";
  }

function init() {
    window.scrollTo(0, document.body.scrollHeight);
    focusMethod();
    console.log("socket", socket)
    socket.on("send-message", (messageBox) => {
        socket.broadcast.emit("recieve-message", messageBox);
    });
    
    socket.on("message", (payload) => {
        console.log("message from socket", payload)
    }) 
    socket.emit("message", "test message")  
  }
window.onload = addSocket

// window.onload();
// mainContainer.addEventListener("DOMContentLoaded", function (event) {
//   window.scrollTo(0, document.body.scrollHeight);
// });
// const socket = io();
// Join chatroom
socket.emit("joinRoom", { room: "default" });

// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//   outputRoomName(room);
//   outputUsers(users);
// });

// // Add room name to DOM
// function outputRoomName(room) {
//   roomName.innerText = room;
// }

// // Add users to DOM
// function outputUsers(users) {
//   userList.innerHTML = '';
//   users.forEach((user) => {
//     const li = document.createElement('li');
//     li.innerText = user.username;
//     userList.appendChild(li);
//   });
// }

function addSocket() {
  if (socket.connected) {
    console.log("socket connected adding listener");
    socket.on("chatMessage", (message) => {
      console.log("chat.js", message);
      messageBox.innerHTML += `<p>${message}</p>`;
    });
    init()
  } else {
    console.log("no socket trying again");
    setTimeout(() => {
      addSocket();
    }, 500);
  }
}


fetch("/api/messages", { method: "GET" })
  .then((data) => data.json())
  .then((res) => {
    console.log(res);
    res.forEach((element) => {
    //   const div = document.createElement("div");
    //   const message = element.body;
    //   div.textContent = `$: ${message}`;
    //   document.getElementById("message-thread").append(div);
    addToChat("fetch", element.body)
});
chat.value = "";
focusMethod();
  })
  .catch((err) => console.log("err", err));

fetch("/api/user/", { method: "GET" })
  .then((data) => data.json())
  .then((res) => {
    console.log(res);
    // const filterUsers = res.filter(res === loggedIn);
    res.forEach((user) => {
      userName.innerHTML += `<h5>You're chatting with:</h5> <h4>${user.username}</h4>`;
      // console.log(element);
    });
  })
  .catch((err) => console.log("err", err));

fetch("/api/convos/", { method: "GET" })
  .then((data) => data.json())
  .then((res) => {
    console.log(res);
  });


//Message form submission
sendBtn.addEventListener("click", () => {
  console.log(socket);
  // window.setTimeout(function () {
  //   window.location.reload();
  // }, 1);
  // const message = chat.value;
  // displayMessage(message);

  //Get message text
  // const chatData = messageBox.value
  // const chatMessage = JSON.stringify(chatData)

  //Emit mesage to the server
  //console.log(chat.value);
  // socket.emit("message", chat.value);
  fetch("/api/messages", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ body: chat.value }),
  }).catch((err) => console.log("err", err));
  focusMethod();
  addToChat("Ted", chat.value)
  socket.emit("message", {
      user: "Ted",
      message: chat.value
    })
    chat.value = "";

//   fetch("/api/messages", { method: "GET" })
//     .then((data) => data.json())
//     .then((res) => {
//       console.log(res);
//       res.forEach((element) => {
//         const div = document.createElement("div");
//         const message = element.body;
//         div.textContent = `$: ${message}`;
//         document.getElementById("message-thread").append(div);
//         chat.value = "";
//         focusMethod();
//         messageBox.scrollTop = messageBox.scrollHeight;
//         // element.forEach((message) => {
//         //   socket.broadcast("chatMessage", message);
//         // });
//       });
//     })
//     .catch((err) => console.log("err", err));
});
// // }
// socket.on("send-message", (messageBox) => {
//   socket.broadcast.emit("recieve-message", messageBox);
// });

// socket.on("message", (payload) => {
//     console.log("message from socket", payload)
// })

sendBtn.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    messageBox.scrollTop = messageBox.scrollHeight;
    // window.setTimeout(function () {
    //   window.location.reload();
    // }, 1);
    const message = chat.value;
    displayMessage(message);

    //Get message text
    // const chatData = messageBox.value
    // const chatMessage = JSON.stringify(chatData)

    //Emit mesage to the server
    console.log(chat.value);
    socket.emit("message", chat.value);
    fetch("/api/messages", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ body: chat.value }),
    }).catch((err) => console.log("err", err));
    chat.value = "";
    focusMethod();
  }
});

function focusMethod() {
  chat.focus();
}

function displayMessage() {
  const div = document.createElement("div");
  const message = chat.value;
  div.textContent = `$: ${message}`;
  document.getElementById("message-thread").append(div);
}
