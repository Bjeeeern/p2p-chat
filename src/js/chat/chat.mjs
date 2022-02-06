import { EventEmitter } from "events";

export default class Chat extends EventEmitter {
  constructor(options = { useEventLogging: true }) {
    super();

    this.id = crypto.randomUUID();

    if (options.useEventLogging) {
      this.on("message", (m) => console.log(`${m.date}: ${m.content}`));
    }
  }

  sendMessage(text) {
    this.emit("message", new Message(text));
  }
}

class Message {
  constructor(content) {
    this.content = content;
    this.date = Date.now();
  }
}
