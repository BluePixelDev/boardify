import { RootState } from "@/redux/store";
import { useSelector } from "react-redux"

export default function () {
    const snippets = useSelector((state: RootState) => state.cssSnippets.snippets)

    return <style>
        {snippets.length > 0 &&
            snippets.map((x) => x.snippet).join("\n")
        }
    </style>
}