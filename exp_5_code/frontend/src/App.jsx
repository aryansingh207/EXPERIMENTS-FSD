import { useState, useEffect } from 'react'
import PostComposer from './PostComposer'
import PostList from './PostList'
import GlobalError from './GlobalError'
import './App.css'

const API_URL = 'http://localhost:8080/api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [globalError, setGlobalError] = useState(null);

  // GET ALL POSTS
  const fetchAllPosts = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();

      setPosts(data);
      setTotalPosts(data.length);

    } catch (err) {
      console.error(err);
      setGlobalError(
        "Could not connect to backend server. Make sure Spring Boot is running on port 8080."
      );
    }
  };

  // GET POSTS BY PLATFORM
  const fetchPostsByPlatform = async (platform) => {
    try {
      const response = await fetch(
        `${API_URL}?platform=${encodeURIComponent(platform)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();

      setPosts(data);
      setGlobalError(null);

    } catch (err) {
      console.error(err);
      setGlobalError("Failed to fetch posts.");
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleCreatePost = async (postData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        fetchAllPosts();
      }

    } catch (err) {
      setGlobalError("Failed to create post.");
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchAllPosts();
      }

    } catch (err) {
      setGlobalError("Failed to delete post.");
    }
  };

  const handleUpdatePost = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        fetchAllPosts();
      }

    } catch (err) {
      setGlobalError("Failed to update post.");
    }
  };

  return (
    <div className="app-container">

      <GlobalError
        message={globalError}
        onClose={() => setGlobalError(null)}
      />

      <header className="app-header">
        <h1>OmniPost Composer</h1>
        <p>Write once, publish anywhere. Respects platform word limits.</p>

        <div className="post-counter">
          Total Posts: <strong>{totalPosts}</strong>
        </div>
      </header>

      <main className="app-main">

        <PostComposer
          onPostCreate={handleCreatePost}
          onError={setGlobalError}
        />

        <PostList
          posts={posts}
          onDelete={handleDeletePost}
          onUpdate={handleUpdatePost}
          onGetPosts={fetchPostsByPlatform}
        />

      </main>

    </div>
  )
}

export default App;