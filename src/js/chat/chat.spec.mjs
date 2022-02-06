import Chat from "./chat.mjs";
import * as chai from "chai";

const expect = chai.expect;

describe("Chat", function () {
  it("generates a connection id", function () {
    const chat = new Chat();

    expect(chat.id).is.not.undefined;
    expect(typeof chat.id).to.be("string");
  });
  describe("single chat instance", function () {
    it("can be used to send messages to self", function () {
      const chat = new Chat();
      const readMessages = [];
      chat.onMessageReceived.push((m) => readMessages.push(m));

      const testMessages = ["test", "test1", "test2"];

      for (const testMessage of testMessages) {
        chat.sendMessage(testMessage);
      }

      expect(readMessages.map((m) => m.content)).to.equal(testMessages);
    });
  });
  describe("couple chat instance", function () {
    it("both can send and receive messages", function () {
      const chatA = new Chat();
      const chatB = new Chat();

      const readChatAMessages = [];
      const readChatBMessages = [];
      chatA.onMessageReceived.push((m) => readChatAMessages.push(m));
      chatB.onMessageReceived.push((m) => readChatBMessages.push(m));

      chatA.sendMessage("test1");
      chatB.sendMessage("test2");
      chatA.sendMessage("test3");

      readChatAMessages = readChatAMessages.map((m) => m.content);
      readChatBMessages = readChatBMessages.map((m) => m.content);

      expect(readChatAMessages).to.equal(["test1", "test2", "test3"]);
      expect(readChatAMessages).to.equal(readChatBMessages);
    });
  });
});
