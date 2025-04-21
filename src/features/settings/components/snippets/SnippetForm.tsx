import { useAppDispatch } from "@/store"
import { addSnippet } from "@/features/snippets"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export const SnippetForm = () => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState("")
    const [content, setContent] = useState("")

    const add = () => {
        if (!name || !content) return
        dispatch(addSnippet({ id: uuidv4(), name, snippet: content, enabled: true }))
        setName("")
        setContent("")
    }

    return (
        <div className="snippet-controls__form">
            <input
                type="text"
                placeholder="Snippet name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="snippet-controls__input"
            />
            <textarea
                placeholder="CSS content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="snippet-controls__textarea"
            />
            <button onClick={add}>Add Snippet</button>
        </div>
    )
}
