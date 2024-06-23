import { create } from 'zustand';

export const useChatMessageStore = create((set, get) => ({
  imageMessages: [],
  documentMessages: [],
  videoMessages: [],

  addChatMessages: (messages) => {
    const imageMessages = [];
    const documentMessages = [];
    const videoMessages = [];

    messages.forEach((message) => {
      if (message.messageType === 'IMAGE' && !message.sendByMe) {
        imageMessages.push(message);
      } else if (message.messageType === 'DOCUMENT' && !message.sendByMe) {
        documentMessages.push(message);
      } else if (message.messageType === 'VIDEO' && !message.sendByMe) {
        videoMessages.push(message);
      }
    });

    set({
      imageMessages,
      documentMessages,
      videoMessages,
    });
  },

  clearChatMessages: () =>
    set({
      imageMessages: [],
      documentMessages: [],
      videoMessages: [],
    }),

  getImageMessages: () => get().imageMessages,
  getDocumentMessages: () => get().documentMessages,
  getVideoMessages: () => get().videoMessages,
}));
