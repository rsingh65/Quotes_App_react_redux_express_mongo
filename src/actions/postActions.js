import * as types from './types';

export function fetchPosts(){
    console.log("inside fetchPosts");
    return function(dispatch){
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res=>res.json())
        .then(posts=>dispatch({
            type : types.FETCH_POSTS,
            payload:posts
        }));
    }
}

export function newPost(postData){
    console.log("inside newPost");
    return function(dispatch){
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST',
            headers :{
                'content-type':'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res=>res.json())
        .then(newPost=>dispatch({
            type: types.NEW_POST,
            payload: newPost
        }));
    }
}