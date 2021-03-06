import axios from 'axios';

const ncNewsAPI = axios.create({
    baseURL: 'https://my-news-api.herokuapp.com/api'
})

export const getArticles = (limit, topic, sort_by, order) => {
    return ncNewsAPI.get(`/articles`, {params: {limit, topic, sort_by, order}}).then(({data}) => {
        return data.articles
    })
}

export const getArticle = (article_id) => {
    return ncNewsAPI.get(`/articles/${article_id}`).then(({data}) => {
        return data.article
    })
}

export const updateArticle = (article_id, votes) => {
    return ncNewsAPI.patch(`/articles/${article_id}`, { inc_votes: votes}).then(({data}) => {
        return data.updatedArticle
    })
}

export const getComments = (article_id) => {
    return ncNewsAPI.get(`/articles/${article_id}/comments`).then(({data}) => {
        return data.comments
    })
}

export const postComment = (article_id, newComment) => {
    return ncNewsAPI.post(`/articles/${article_id}/comments`, newComment).then(({data}) => {
        console.log(data.newComment)
        return data.newComment
    })
}

export const deleteComment = (comment_id) => {
    return ncNewsAPI.delete(`/comments/${comment_id}`)
}

export const updateComment = (comment_id, votes) => {
    return ncNewsAPI.patch(`/comments/${comment_id}`, { inc_votes: votes}).then(({data}) => {
        return data.updatedComment
    })
}