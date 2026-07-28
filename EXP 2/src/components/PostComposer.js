import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/postsSlice";
import { changePlatform } from "../features/platformSlice";

function PostComposer() {
  const dispatch = useDispatch();

  const { currentPlatform, platforms } = useSelector(
    (state) => state.platforms
  );

  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim() === "") return;

    dispatch(
      addPost({
        id: Date.now(),
        text,
        platform: currentPlatform,
      })
    );

    setText("");
  };

  return (
    <div className="composer">

      <h2>✍️ Create New Post</h2>

      <textarea
        rows="5"
        placeholder="Write your post..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        value={currentPlatform}
        onChange={(e) =>
          dispatch(changePlatform(e.target.value))
        }
      >
        {platforms.map((platform) => (
          <option key={platform}>
            {platform}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>
        🚀 Add Draft
      </button>

    </div>
  );
}

export default PostComposer;