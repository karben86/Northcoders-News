import axios from 'axios';

const ncNewsAPI = axios.create({
    baseURL: 'https://my-news-api.herokuapp.com/api'
})

export const getArticles = (filterValue, topic) => {
    return ncNewsAPI.get(`/articles`, {params: {limit: filterValue, topic}}).then(({data}) => {
        return data.articles
    })
}

export const getArticle = (article_id) => {
    return ncNewsAPI.get(`/articles/${article_id}`).then(({data}) => {
        return data.article
    })
}

export const getComments = (article_id) => {
    return ncNewsAPI.get(`/articles/${article_id}/comments`).then(({data}) => {
        return data.comments
    })
}