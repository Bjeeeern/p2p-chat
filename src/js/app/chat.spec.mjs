import Chat from "./chat.mjs";

describe("Chat", function () {
  it("generates a connection id", function () {
    const chat = new Chat();

    expect(chat.id).toBeDefined;
    expect(typeof chat.id).toBe("string");
  });
  describe("single chat instance", function () {
    var chat;

    beforeEach(function () {
      chat = new Chat();
    });

    it("can be used to send messages to self", function () {
      let readMessages = [];
      chat.onMessageReceived.push((m) => readMessages.push(m));

      let testMessages = ["test", "test1", "test2"];

      for (let testMessage of testMessages) {
        chat.sendMessage(testMessage);
      }

      expect(readMessages.map((m) => m.content)).toEqual(testMessages);
    });
  });
  describe("couple chat instance", function () {
    it("both can send and receive messages", function () {
      const chatA = new Chat();
      const chatB = new Chat();

      let readChatAMessages = [];
      let readChatBMessages = [];
      chatA.onMessageReceived.push((m) => readChatAMessages.push(m));
      chatB.onMessageReceived.push((m) => readChatBMessages.push(m));

      chatA.sendMessage("test1");
      chatB.sendMessage("test2");
      chatA.sendMessage("test3");

      readChatAMessages = readChatAMessages.map((m) => m.content);
      readChatBMessages = readChatBMessages.map((m) => m.content);

      expect(readChatAMessages).toEqual(["test1", "test2", "test3"]);
      expect(readChatAMessages).toEqual(readChatBMessages);
    });
  });
});
