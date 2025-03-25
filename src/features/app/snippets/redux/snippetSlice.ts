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
      snippet: ""
    }
  ],
};

const cssSnippetsSlice = createSlice({
  name: "cssSnippets",
  initialState,
  reducers: {
    addSnippet: (state, action) => {
      state.snippets.push(action.payload); 
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
