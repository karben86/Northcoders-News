import React, { Component } from "react";
import {getArticle, getComments, postComment, deleteComment, updateComment} from '../API'

class Article extends Component {
    state = {article: {},
    comments: [],
    isLoading: true,
    newComment: "",
    buttonDisabled: {}}
    

    componentDidMount() {
        const buttonRef = {};
        Promise.all([getArticle(this.props.article_id), getComments(this.props.article_id)])
        .then(([article, comments]) => {
            comments.forEach(comment => buttonRef[comment.comment_id] = false)
            this.setState({ article, comments, buttonDisabled: buttonRef, isLoading: false});
          })
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

    voteClick = (id, votes) => {
        const updatedButtons = {...this.state.buttonDisabled}
        updatedButtons[id] = true
        const updatedComments = [...this.state.comments].map(comment => {
          if (comment.comment_id === id) comment.votes += votes;
          return comment;
        })
        updateComment(id, votes).then(() => {
        this.setState({buttonDisabled: updatedButtons, articles: updatedComments})
        })
      };

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
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="newComment">Post New Comment:</label>
                <br></br>
                <textarea id="newComment" name="newComment" rows="4" cols="50" onChange={this.handleChange} required></textarea>
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
                    Vote for this comment: <button className="buttonStyle" onClick={(event) => this.voteClick(comment.comment_id, 1)} disabled={this.state.buttonDisabled[comment.comment_id]}>👆</button>
                    <button className="buttonStyle" onClick={(event) => this.voteClick(comment.comment_id, -1)} disabled={this.state.buttonDisabled[comment.comment_id]}>👇</button>
                </li>
            ))}
        </ul>
            </div>)
            }
            </main>)
    }
}

export default Article;