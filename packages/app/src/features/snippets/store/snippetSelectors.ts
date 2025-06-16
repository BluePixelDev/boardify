import { RootState } from "@/redux";
import { createSelector } from "reselect";

export const selectEnabledSnippets = createSelector(
  (state: RootState) => state.cssSnippets.snippets,
  (snippets) => snippets.filter((snippet) => snippet.enabled)
);
