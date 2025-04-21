import { useAppSelector } from "@/store"
import { SnippetForm } from "./SnippetForm"
import { SnippetCard } from "./SnippetCard"
import "./SnippetControls.styles.css"

export const SnippetControls = () => {
    const snippets = useAppSelector(state => state.cssSnippets.snippets)

    return (
        <div className="snippet-controls">
            <h3 className="snippet-controls__title">CSS Snippets</h3>
            <ul className="snippet-controls__list">
                {snippets.map(snippet => (
                    <li key={snippet.id}>
                        <SnippetCard snippet={snippet} />
                    </li>
                ))}
            </ul>
            <SnippetForm />
        </div>
    )
}
