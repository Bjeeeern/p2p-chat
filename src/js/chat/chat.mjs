import { EventEmitter } from "events";
import { format } from "date-fns";

export default class Chat extends EventEmitter {
  constructor(options = { useEventLogging: true }) {
    super();

    this.id = crypto.randomUUID();

    if (options.useEventLogging) {
      this.on("message", (m) =>
        console.log(`${format(m.date, "dd/MM-yy")}: ${m.content}`)
      );
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
