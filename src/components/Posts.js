import React, { Component} from 'react';
import * as postActions from '../actions/postActions';
//import {fetchPosts} from '../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class Posts extends Component {
    componentDidMount() {
        this.props.actions.fetchPosts();
    }
    
    render() {
        const postItems = this.props.posts;
        var postItemsDisplay;
        if (postItems.length <= 0) {
            postItemsDisplay = "No posts to display";
        }
        else {
            postItemsDisplay = postItems.map(post => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ));
        }
        return (
            <div>
                <h1>Posts</h1>
                <div>
                    {postItemsDisplay}
                </div>
            </div>
        )
    }
}

Posts.prototypes={
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    post: PropTypes.object
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
    post:state.posts.post
})

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(postActions, dispatch) });

//export default connect(mapStateToProps, {fetchPosts})(Posts);
export default connect(mapStateToProps, mapDispatchToProps)(Posts);