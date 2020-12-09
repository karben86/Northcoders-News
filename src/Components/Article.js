import React, { Component } from "react";
import {getArticle, getComments} from '../API'

class Article extends Component {
    state = {article: {}, comments: {}, isLoading: true}
    

    componentDidMount() {
        getArticle(this.props.article_id).then((article) => {
          this.setState({ article});
        })
        .then(getComments(this.props.article_id).then((comments) => {
            this.setState({ comments, isLoading: false });
        }))
      }

    render(){
        let {article, comments} = this.state;
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
            <p><b>Topic: {article.topic[0].toUpperCase() + article.topic.slice(1)} | Author: {article.author} | Votes: {article.votes} | Comment Count: {article.comment_count} | Date: {article.created_at.slice(0,10)}</b></p>
            <h3> Comments </h3>
            <ul>
            {comments.map(comment => (
               <li key={comment.comment_id}>
                   <p>{comment.body}</p>
                    Author: {comment.author} | Votes: {comment.votes} | Date: {comment.created_at.slice(0,10)}
                </li>
            ))}
        </ul>
            </div>)
            }
            </main>)
    }
}

export default Article;