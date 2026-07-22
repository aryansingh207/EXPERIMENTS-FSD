import React, { useState, useEffect } from "react";
import "./PostComposer.css";
import DraftList from "./DraftList";

const platforms = {
  Twitter: { limit: 280 },
  Instagram: { limit: 2200 },
  LinkedIn: { limit: 3000 },
};

function PostComposer() {
  const [text, setText] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [media, setMedia] = useState(null);

  const [drafts, setDrafts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load drafts from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("drafts"));
    if (saved) setDrafts(saved);
  }, []);

  // Save drafts to localStorage
  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const handlePlatformChange = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const saveDraft = () => {
    if (text.trim() === "") {
      alert("Write something first!");
      return;
    }

    if (editingId !== null) {
      setDrafts(
        drafts.map((draft) =>
          draft.id === editingId
            ? {
                ...draft,
                text,
                selectedPlatforms,
                media: media ? media.name : draft.media,
              }
            : draft
        )
      );

      setEditingId(null);
    } else {
      const draft = {
        id: Date.now(),
        text,
        selectedPlatforms,
        media: media ? media.name : "",
      };

      setDrafts([...drafts, draft]);
    }

    setText("");
    setSelectedPlatforms([]);
    setMedia(null);
  };

  const deleteDraft = (id) => {
    setDrafts(drafts.filter((draft) => draft.id !== id));
  };

  const editDraft = (draft) => {
    setEditingId(draft.id);
    setText(draft.text);
    setSelectedPlatforms(draft.selectedPlatforms);
  };

  return (
    <div className="composer">

      <textarea
        rows="6"
        placeholder="Write your post..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setMedia(e.target.files[0])}
      />

      <h3>Select Platforms</h3>

      {Object.keys(platforms).map((platform) => (
        <label key={platform}>
          <input
            type="checkbox"
            checked={selectedPlatforms.includes(platform)}
            onChange={() => handlePlatformChange(platform)}
          />
          {platform}
        </label>
      ))}

      <div className="results">
        {selectedPlatforms.map((platform) => {
          const limit = platforms[platform].limit;
          const remaining = limit - text.length;

          return (
            <div className="card" key={platform}>
              <h4>{platform}</h4>

              <p>
                Characters : {text.length}/{limit}
              </p>

              <p>
                Remaining : {remaining}
              </p>

              {remaining < 0 ? (
                <p className="error">Character limit exceeded!</p>
              ) : (
                <p className="success">Valid Post ✔</p>
              )}
            </div>
          );
        })}
      </div>

      <button className="saveBtn" onClick={saveDraft}>
        {editingId ? "Update Draft" : "Save Draft"}
      </button>

      <DraftList
        drafts={drafts}
        onDelete={deleteDraft}
        onEdit={editDraft}
      />
    </div>
  );
}

export default PostComposer;