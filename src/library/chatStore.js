import { create } from 'zustand';

export const useChatStore = create((set) => ({
  chatId: null,
  chatDetails: null,
  changeChat: (chatId, chatDetails) => {
    return set({
      chatId,
      chatDetails,
    });
  },

  resetChat: () => {
    set({
      chatId: null,
      chatDetails: null,
    });
  },
}));
