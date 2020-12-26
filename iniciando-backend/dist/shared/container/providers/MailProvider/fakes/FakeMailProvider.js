"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailProvider {
  constructor() {
    this.messages = [];
  }

  async sendMail(messages) {
    this.messages.push(messages);
  }

}

exports.default = FakeMailProvider;