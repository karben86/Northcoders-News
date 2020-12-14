import './App.css';
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Article from "./Components/Article";
import WrongPath from "./Components/WrongPath";
import { Router } from "@reach/router";

function App() {
  return (
    <div className="App">
      <div className = "topPage">
      <Header />
      <Nav />
      </div>
      <Router>
        <Login path="/login" />
        <Article path="/articles/:article_id" />
        <Home path="/" />
        <WrongPath default />
      </Router>
    </div>
  );
}

export default App;
