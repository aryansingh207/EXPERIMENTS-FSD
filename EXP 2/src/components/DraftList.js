import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, updatePost } from "../features/postsSlice";
import { selectFilteredPosts } from "../features/selectors";

const DraftList = React.memo(() => {
  const dispatch = useDispatch();

  const posts = useSelector(selectFilteredPosts);

  return (
    <div>

      <h2>📂 Filtered Drafts</h2>

      {posts.length === 0 ? (
        <p className="empty">
          No Posts for Selected Platform
        </p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">

            <h4>🌐 {post.platform}</h4>

            <p>{post.text}</p>

            <button
              onClick={() =>
                dispatch(deletePost(post.id))
              }
            >
              🗑 Delete
            </button>

            <button
              onClick={() => {
                const updated = prompt(
                  "Edit Post",
                  post.text
                );

                if (updated !== null) {
                  dispatch(
                    updatePost({
                      id: post.id,
                      text: updated,
                    })
                  );
                }
              }}
            >
              ✏ Edit
            </button>

          </div>
        ))
      )}

    </div>
  );
});

export default DraftList;