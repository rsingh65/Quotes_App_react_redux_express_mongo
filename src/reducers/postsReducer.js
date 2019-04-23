//here we return a new state
import * as types from '../actions/types';

const initialState = {
    posts: [],
    post:{}
}

function postsReducer(state = initialState, action){
    switch(action.type){
        case types.FETCH_POSTS:       
            return {
                ...state,
                posts:[...action.payload]
            };
        case types.NEW_POST :
            return {
                ...state,
                posts : [...state.posts,action.payload.post]
            }
        default:
            return state;
    }
}

export default postsReducer;