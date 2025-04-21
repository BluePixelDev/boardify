import { useAppSelector } from "@/store";
import { selectEnabledSnippets } from "./snippetSelectors";

export const CSSnippets = () => {
    const snippets = useAppSelector(selectEnabledSnippets)
    const combinedCSS = snippets.map((x) => x.snippet).join("\n")

    return <style
        dangerouslySetInnerHTML={{
            __html: combinedCSS,
        }}
    />
}

export default CSSnippets;