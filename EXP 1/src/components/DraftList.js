import React from "react";
import "./DraftList.css";

function DraftList({ drafts, onDelete, onEdit }) {
  return (
    <div className="draftContainer">

      <h2>Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p>No Drafts Available</p>
      ) : (
        drafts.map((draft) => (
          <div className="draftCard" key={draft.id}>

            <p>
              <strong>Post:</strong>
              <br />
              {draft.text}
            </p>

            <p>
              <strong>Platforms:</strong>{" "}
              {draft.selectedPlatforms.join(", ")}
            </p>

            {draft.media && (
              <p>
                <strong>Media:</strong> {draft.media}
              </p>
            )}

            <button onClick={() => onEdit(draft)}>
              Edit
            </button>

            <button
              className="delete"
              onClick={() => onDelete(draft.id)}
            >
              Delete
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default DraftList;