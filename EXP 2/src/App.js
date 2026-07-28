import "./App.css";
import PostComposer from "./components/PostComposer";
import DraftList from "./components/DraftList";

function App() {
  return (
    <div className="App">

      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>

      <header className="hero">

        <h1>🚀 Social Media Post Manager</h1>

        <p>
          Redux Toolkit | Centralized State Management
        </p>

      </header>

      <PostComposer />

      <DraftList />

    </div>
  );
}

export default App;