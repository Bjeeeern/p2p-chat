import Chat from "./app/chat.mjs";

let chat = new Chat();

document.querySelector(".connection-id").textContent = chat.id;
