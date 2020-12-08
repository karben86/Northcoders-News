import React, { Component } from "react";
import {getArticle} from '../API'

class Article extends Component {
    state = {article: {}, isLoading: true}
    

    componentDidMount() {
        getArticle(this.props.article_id).then((article) => {
          this.setState({ article, isLoading: false });
        });
      }

    render(){
        let {article} = this.state;
        article = article[0];
        const {isLoading} = this.state

        return (
            <main>
            {isLoading ? null : 
            (
            <div>
            <h2>Article {article.article_id}</h2>
            <h3> {article.title} </h3>
            <p>{article.body}</p>
            Topic: {article.topic[0].toUpperCase() + article.topic.slice(1)} | Author: {article.author} | Votes: {article.votes} | Comment Count: {article.comment_count} | Date: {article.created_at.slice(0,10)}
            </div>)
            }
            </main>)
    }
}

export default Article;