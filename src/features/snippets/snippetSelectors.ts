import { RootState } from "@/store";

export function selectEnabledSnippets(state: RootState) {
  return state.cssSnippets.snippets.filter((snippet) => snippet.enabled);
}
