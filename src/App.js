import './App.css';
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Article from "./Components/Article";
import { Router } from "@reach/router";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Router>
        <Login path="/login" />
        <Article path="/:article_id" />
        <Home path="/" />
      </Router>
    </div>
  );
}

export default App;
