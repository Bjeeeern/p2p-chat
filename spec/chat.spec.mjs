import { Chat } from "../src/chat.mjs";

describe("Chat", function () {
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
    var chatA, chatB;

    beforeEach(function () {
      chatA = new Chat();
      chatB = new Chat();
    });

    it("both can send and receive messages", function () {
      let readChatAMessages = [];
      let readChatBMessages = [];
      chatA.onMessageReceived.push((m) => readChatAMessages.push(m));
      chatB.onMessageReceived.push((m) => readChatBMessages.push(m));

      let testMessages = ["test", "test1", "test2", "test3"];

      for (let testMessage of testMessages.odd) {
        chat.sendMessage(testMessage);
      }

      expect(readMessages.map((m) => m.content)).toEqual(testMessages);
    });
  });
});
