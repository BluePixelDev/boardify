import { selectEnabledSnippets, useAppSelector } from "@/redux";
import { Snippet } from "./types";

export const Snippets = () => {
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

export default Snippets;
