import React, { Component } from "react";
import {getArticles} from '../API'

class Home extends Component {
  state = {
    articles: [],
    isLoading: true,
    filterValue: 50,
    topic: null
  };

  componentDidMount() {
    getArticles(this.state.filterValue).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate = (prepsProps, preState) => {
  if ((preState.filterValue !== this.state.filterValue) || (preState.topic !== this.state.topic)) {
      return getArticles(this.state.filterValue, this.state.topic).then((articles) => {
        this.setState({ articles, isLoading: false });
      })
    }
  };

  // handleClick = (target) => {
  //   if (target.className === "DisplayAllStudent-Btn")
  //     this.setState({ displayAllStudents: true, displaySingle: false });
  //   if (target.className === "DisplaySingleStudent-Btn")
  //     this.setState({ displaySingle: true, displayAllStudents: false });
  // };

  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   navigate(`/students/${this.state.selectedId}`);
  // };

  render() {
    const {
      articles
    } = this.state;

    return (
      <main>
        <h2>Articles</h2>
        How many results do you want to display?
        <br></br>
        <input type="range" id="filterValue" onChange={this.handleChange}></input> {this.state.filterValue}
        <br></br>
        Which topic are you interested in?
        <br></br>
        <select id="topic" onChange={this.handleChange}>
          <option value={null}>All</option>
          <option value="coding">Coding</option>
          <option value="football">Football</option>
          <option value="cooking">Cooking</option>
        </select>
        <ul>
            {articles.map(article => (
                <li key={article.article_id}>
                    <h2>{article.title}</h2>
                </li>
            ))}
        </ul>
      </main>
    );
  }
}

export default Home;
