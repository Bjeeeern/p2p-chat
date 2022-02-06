import Chat from "./chat.mjs";
import * as chai from "chai";

const should = chai.should();

describe("Chat", function () {
  it("generates a connection id", function () {
    const chat = new Chat();

    should.exist(chat.id);
    chat.id.should.be.a("string");
  });
  describe("single chat instance", function () {
    it("can be used to send messages to self", function () {
      const chat = new Chat();
      const readMessages = [];
      chat.on("message", (m) => readMessages.push(m.content));

      const testMessages = ["test", "test1", "test2"];

      for (const testMessage of testMessages) {
        chat.sendMessage(testMessage);
      }

      readMessages.should.deep.equal(testMessages);
    });
  });
  describe("couple chat instance", function () {
    it("both can send and receive messages", function () {
      const chatA = new Chat();
      const chatB = new Chat();

      const readChatAMessages = [];
      const readChatBMessages = [];
      chatA.on("message", (m) => readChatAMessages.push(m.content));
      chatB.on("message", (m) => readChatBMessages.push(m.content));

      chatA.sendMessage("test1");
      chatB.sendMessage("test2");
      chatA.sendMessage("test3");

      readChatAMessages.should.deep.equal(["test1", "test2", "test3"]);
      readChatAMessages.should.deep.equal(readChatBMessages);
    });
  });
});
