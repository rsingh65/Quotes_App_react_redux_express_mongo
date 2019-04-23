import * as types from './types';

export function fetchPosts(){
    return function(dispatch){
        fetch('http://localhost:3001/api/getPosts')
        .then(res=>res.json())
        .then(posts=>{
            console.log(posts.posts);
            dispatch({
            type : types.FETCH_POSTS,
            payload:posts.posts
        })});
    }
}

export function newPost(postData){
    return function(dispatch){
        fetch('http://localhost:3001/api/createPost',{
            method: 'POST',
            headers :{
                'content-type':'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res=>res.json())
        .then(newPost=>{dispatch({
            type: types.NEW_POST,
            payload: newPost
        })});
    }
}