export class Chat {
  constructor(options = { useEventLogging: true }) {
    this.onMessageReceived = [];
    if (options.useEventLogging) {
      this.onMessageReceived.push((m) =>
        console.log(`${m.date}: ${m.content}`)
      );
    }
  }

  sendMessage(text) {
    for (let func of this.onMessageReceived) {
      func(new Message(text));
    }
  }
}

class Message {
  constructor(content) {
    this.content = content;
    this.date = Date.now();
  }
}
