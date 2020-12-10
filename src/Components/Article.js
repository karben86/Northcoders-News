import React, { Component } from "react";
import {getArticle, getComments, postComment, deleteComment} from '../API'

class Article extends Component {
    state = {article: {}, comments: [], isLoading1: true, isLoading2: true, newComment: ""}
    

    componentDidMount() {
        getArticle(this.props.article_id).then((article) => {
          this.setState({ article, isLoading1: false});
        })
        .then(getComments(this.props.article_id).then((comments) => {
            this.setState({ comments, isLoading2: false });
        }))
      }

      handleChange = (event) => {
        this.setState({ newComment: event.target.value });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        const comment = {body: this.state.newComment, username: 'jessjelly'}
        postComment(this.props.article_id, comment).then((createdComment) => {
            this.setState((currState) => {
                return {comments: [createdComment[0], ...currState.comments]}
            })
        });
      }

    handleDelete = (event) => {
        deleteComment(event.target.id).then(() => {
            this.setState((currState) => {
                return {comments: [...currState.comments].filter(comment => comment.comment_id !== +event.target.id)}
            })
        });
    }

    render(){
        console.log(this.state)
        let {article, comments} = this.state;
        article = article[0];
        const {isLoading1, isLoading2} = this.state
        return (
            <main>
            {isLoading1 + isLoading2 ? null : 
            (
            <div>
            <h2>Article {article.article_id}</h2>
            <h3> {article.title} </h3>
            <p>{article.body}</p>
            <p><b>Topic: {article.topic[0].toUpperCase() + article.topic.slice(1)} | Author: {article.author} | Votes: {article.votes} | Comment Count: {article.comment_count} | Date: {article.created_at.slice(0,10)}</b></p>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="newComment">Post New Comment:</label>
                <br></br>
                <textarea id="newComment" name="newComment" rows="4" cols="50" onChange={this.handleChange}></textarea>
                <br></br>
                <button type="submit">Submit</button>
            </form>
            <h3> Comments </h3>
            <ul>
            {comments.map(comment => (
               <li key={comment.comment_id}>
                   <p>{comment.body}</p>
                    Author: {comment.author} | Votes: {comment.votes} | Date: {comment.created_at.slice(0,10)}
                    <br></br>
                    {comment.author === "jessjelly" ? <button id={comment.comment_id} onClick={this.handleDelete}>Delete Comment</button> :null}
                </li>
            ))}
        </ul>
            </div>)
            }
            </main>)
    }
}

export default Article;