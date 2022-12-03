import create, { SetState, GetState } from "zustand";

const initialState = {
  posts: ["ayo"],
};

type useStoreType = {
  posts: Array<any>;
  getPosts: () => void
};

export const useStore = create<useStoreType>(
  (set: SetState<useStoreType>, get: GetState<useStoreType>) => ({
    ...initialState,
    getPosts: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      set({ posts: await response.json() })
    }
  })
);
