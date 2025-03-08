export class Conversation {
  constructor(userIds, conversationName, message, isGroup) {
    this.userIds = userIds;
    this.conversationName = conversationName;
    this.message = message;
    this.isGroup = isGroup;
  }
}
