import Chat from "./chat/chat.mjs";

let chat = new Chat();

document.querySelector(".connection-id").textContent = chat.id;
