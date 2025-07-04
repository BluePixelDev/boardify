import { Snippet } from "@/features/snippets";
import { createSlice } from "@reduxjs/toolkit";

interface SnippetState {
  snippets: Snippet[];
}

const initialState: SnippetState = {
  snippets: [],
};

const snippetsSlice = createSlice({
  name: "cssSnippets",
  initialState,
  reducers: {
    addSnippet: (state, action) => {
      state.snippets.push(action.payload);
    },
    removeSnippet: (state, action) => {
      state.snippets = state.snippets.filter(
        (snippet) => snippet.id !== action.payload
      );
    },
    updateSnippet: (state, action) => {
      const index = state.snippets.findIndex(
        (snippet) => snippet.id === action.payload.id
      );
      if (index !== -1) {
        state.snippets[index] = action.payload;
      }
    },
  },
});

export type { SnippetState as CSSSnippetState };
export const { addSnippet, removeSnippet, updateSnippet } =
  snippetsSlice.actions;

export default snippetsSlice.reducer;
