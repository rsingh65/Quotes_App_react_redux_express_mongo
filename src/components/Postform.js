import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as postActions from '../actions/postActions';
import { bindActionCreators } from 'redux';

class Postform extends Component {
    constructor(props){
        super(props);

        this.state={
            title : '',
            body:''
        }
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        const post ={
            title : this.state.title,
            body: this.state.body
        };
        this.props.actions.newPost(post);
    }
    render() {
        return (
            <div>
                <h1>Add User</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label><b>Title : </b></label>
                        <input type="text" name="title" onChange={this.onChange}></input>
                        <br></br><br></br>
                        <label><b>Body : </b></label>
                        <input type="text" name="body" onChange={this.onChange}></input>
                        <br></br><br></br>
                        <button type="submit"><b>Submit</b></button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    post : state.posts.post
});

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(postActions,dispatch)});

export default connect(mapStateToProps,mapDispatchToProps)(Postform);