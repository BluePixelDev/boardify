import { useAppSelector } from "@/store";

export const CSSnippets = () => {
    const snippets = useAppSelector((state) => state.cssSnippets.snippets)

    return <style>
        {snippets.length > 0 &&
            snippets.map((x) => x.snippet).join("\n")
        }
    </style>
}

export default CSSnippets;