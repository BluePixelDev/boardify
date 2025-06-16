import { useAppSelector } from "@/redux";
import { Snippet } from "./types";
import { selectEnabledSnippets } from "./store/snippetSelectors";

export const InjectedStyles = () => {
  const snippets = useAppSelector(selectEnabledSnippets);
  const combinedCSS = snippets.map((x: Snippet) => x.snippet).join("\n");

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: combinedCSS,
      }}
    />
  );
};

export default InjectedStyles;
