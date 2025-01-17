import { createSlice } from "@reduxjs/toolkit";

type CSSSnippet = {
  id: string,
  name: string,
  snippet: string
}

interface CSSSnippetState {
  snippets: CSSSnippet[]
}

const initialState: CSSSnippetState = {
  snippets: [
    {
      id: "test",
      name: "Test Snippet",
      snippet: ".board-node {transform-origin: center; border-radius: 30px; transition: rotate 0.1s; transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);  } .transform-rect:hover .board-node {rotate: 30deg;}"
    }
  ],
};

const cssSnippetsSlice = createSlice({
  name: "cssSnippets",
  initialState,
  reducers: {
    addSnippet: (state, action) => {
      state.snippets.push(action.payload); // Add new snippet
    },
    removeSnippet: (state, action) => {
      state.snippets = state.snippets.filter(snippet => snippet.id !== action.payload);
    },
    updateSnippet: (state, action) => {
      const index = state.snippets.findIndex(snippet => snippet.id === action.payload.id);
      if (index !== -1) {
        state.snippets[index] = action.payload;
      }
    }
  }
});

export type { CSSSnippet, CSSSnippetState };
export const { addSnippet, removeSnippet, updateSnippet } = cssSnippetsSlice.actions;
export default cssSnippetsSlice.reducer;
