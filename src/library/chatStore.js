import { create } from 'zustand';
import { useUserStore } from './userStore';

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
