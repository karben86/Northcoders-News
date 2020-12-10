import React, { Component } from "react";
import {getArticles, updateArticle} from '../API'
import { Link } from "@reach/router";

class Home extends Component {
  state = {
    articles: [],
    isLoading: true,
    limit: 50,
    topic: null,
    buttonText: "🔽",
    sort_by: "title",
    order: "desc",
    buttonDisabled: {}
  };

  
  componentDidMount() {
    const buttonRef = {};
    getArticles(this.state.limit, this.state.topic, this.state.sort_by, this.state.order).then((articles) => {
      articles.forEach(article => buttonRef[article.article_id] = false)
      this.setState({ articles, isLoading: false, buttonDisabled: buttonRef});
    })
  }

  componentDidUpdate = (prepsProps, preState) => {
  if ((preState.limit !== this.state.limit) || (preState.topic !== this.state.topic) || (preState.sort_by !== this.state.sort_by) || (preState.order !== this.state.order)) {
      return getArticles(this.state.limit, this.state.topic, this.state.sort_by, this.state.order).then((articles) => {
        this.setState({ articles, isLoading: false });
      })
    }
  };

  handleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };

  sortClick = (event) => {
    const {innerText} = event.target;
    if (innerText === "🔽") this.setState({buttonText: "🔼", order: "asc"});
    else this.setState({buttonText: "🔽", order: "desc"});
  };
  
  voteClick = (id, votes) => {
    const updatedButtons = {...this.state.buttonDisabled}
    updatedButtons[id] = true
    const updatedArticles = [...this.state.articles].map(article => {
      if (article.article_id === id) article.votes += votes;
      return article;
    })
    updateArticle(id, votes).then((updatedArticle) => {
    this.setState({buttonDisabled: updatedButtons, articles: updatedArticles})
    })
  };

  render() {
    const {
      articles
    } = this.state;
    console.log(this.state)
    return (
      <main>
        <h2>Articles</h2>
        <p>
        How many results do you want to display?
        <br></br>
        <input type="range" id="limit" onChange={this.handleChange}></input> {this.state.limit}
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
        <select id="sort_by" onChange={this.handleChange}>
          <option value="title">Title</option>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select> <button className="buttonStyle" onClick={this.sortClick}>{this.state.buttonText}</button>
        </p>
        <ul>
            {articles.map(article => (
               <li key={article.article_id + 1}><Link key={article.article_id + 1} style={{ textDecoration: 'none' }} to={"/" + article.article_id}>
                    <h2>{article.title}</h2>
                    
                    Topic: {article.topic[0].toUpperCase() + article.topic.slice(1)} | Author: {article.author} | Votes: {article.votes} | Comment Count: {article.comment_count} | Date: {article.created_at.slice(0,10)}
                    <br></br>
                    <br></br>
                    </Link>
                    <div key={article.article_id + 2}>
                    Vote for this article: <button className="buttonStyle" onClick={(event) => this.voteClick(article.article_id, 1)} disabled={this.state.buttonDisabled[article.article_id]}>👆</button>
                    <button className="buttonStyle" onClick={(event) => this.voteClick(article.article_id, -1)} disabled={this.state.buttonDisabled[article.article_id]}>👇</button>
                    </div>
                    </li>
            ))}
        </ul>
      </main>
    );
  }
}

export default Home;
