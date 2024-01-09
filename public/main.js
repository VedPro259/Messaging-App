const socket = io('http://localhost:3500/'); 
socket.on("connection");

let name; 
socket.on("connect", () => {
  name = socket.id;  
});

function disableButton(value) {
  const button = document.querySelector(value);
  button.disabled = true;
  setTimeout(function() {
    button.disabled = false;
  }, 3000);
};

function getName() {
  if (document.querySelector('.name-input').value) {
    name = document.querySelector('.name-input').value;
  } 
  document.querySelector('.name-display').innerHTML = `Name: ${name}`; 
  disableButton('.submit-name');
}

function sendMessage() {
  let messageData = {
    senderName: name, 
    text: document.querySelector('.message').value
  };
  socket.emit('message', messageData); 
  disableButton('.submit'); 
};

socket.on("message", data => {
  if (data.senderName.startsWith(name)) {
    document.querySelector('.texts').innerHTML += `<p style="color: green;">${data.senderName}: ${data.text}</p>`; 
  } else {
    document.querySelector('.texts').innerHTML += `<p>${data.senderName}: ${data.text}</p>`; 
  }
});