import React, { Component } from "react";
import {getArticles} from '../API'
import { Link } from "@reach/router";

class Home extends Component {
  state = {
    articles: [],
    isLoading: true,
    filterValue: 50,
    topic: null,
    buttonText: "🔽"
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

  handleChange = (event) => {
    const { value, id } = event.target;
    console.log(value)
    this.setState({ [id]: value });
  };

  buttonClick = (event) => {
    const {innerText} = event.target;
    console.log(innerText)
    if (innerText === "🔽") this.setState({buttonText: "🔼"});
    else this.setState({buttonText: "🔽"});
  };

  render() {
    const {
      articles
    } = this.state;

    return (
      <main>
        <h2>Articles</h2>
        <p>
        How many results do you want to display?
        <br></br>
        <input type="range" id="filterValue" onChange={this.handleChange}></input> {this.state.filterValue}
        </p>
        <p>
        Which topic are you interested in?
        <br></br>
        <select id="topic" onChange={this.handleChange}>
          <option value="">All</option>
          <option value="coding">Coding</option>
          <option value="football">Football</option>
          <option value="cooking">Cooking</option>
        </select>
        </p>
        <p>
        How do you want to sort your data?
        <br></br>
        <select id="sort" onChange={this.handleChange}>
          <option value="title">Title</option>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select> <button id="buttonStyle" onClick={this.buttonClick}>{this.state.buttonText}</button>
        </p>
        <ul>
            {articles.map(article => (
               <Link to={"/" + article.article_id}><li key={article.article_id}>
                    <h2>{article.title}</h2>
                    Topic: {article.topic[0].toUpperCase() + article.topic.slice(1)} | Author: {article.author} | Votes: {article.votes} | Comment Count: {article.comment_count} | Date: {article.created_at.slice(0,10)}
                </li></Link> 
            ))}
        </ul>
      </main>
    );
  }
}

export default Home;
