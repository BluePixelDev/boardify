import { Snippet, updateSnippet, removeSnippet } from "@/features/snippets";
import { useAppDispatch } from "@/store";
import { useState } from "react";

interface SnippetCardProps {
  snippet: Snippet;
}

export const SnippetCard = ({ snippet }: SnippetCardProps) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(snippet.name);
  const [content, setContent] = useState(snippet.snippet);

  const save = () => {
    dispatch(updateSnippet({ ...snippet, name, snippet: content }));
    setEditing(false);
  };

  return (
    <div className="snippet-card">
      <label className="switch snippet-card__toggle">
        <input
          type="checkbox"
          checked={snippet.enabled ?? true}
          onChange={() =>
            dispatch(updateSnippet({ ...snippet, enabled: !snippet.enabled }))
          }
        />
        <span className="slider" />
      </label>

      {editing ? (
        <div className="snippet-card__edit">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="snippet-controls__input"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="snippet-controls__textarea"
          />
          <div className="snippet-card__actions">
            <button onClick={save}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="snippet-card__name">{snippet.name}</h4>
          <pre className="snippet-card__preview">{snippet.snippet}</pre>
          <div className="snippet-card__actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => dispatch(removeSnippet(snippet.id))}>
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
};
