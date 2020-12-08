import axios from 'axios';

const ncNewsAPI = axios.create({
    baseURL: 'https://my-news-api.herokuapp.com/api'
})

export const getArticles = (filterValue, topic) => {
    return ncNewsAPI.get(`/articles`, {params: {limit: filterValue, topic}}).then(({data}) => {
        return data.articles
    })
}