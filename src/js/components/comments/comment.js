import React from "react";



export default class Comment extends React.Component {
    constructor() {
        super();

        this.state = JSON.parse(localStorage.getItem('commentTree')) || {
            "comments": []
        };
    }
    covertTimestamp(timestamp) {
        var diffDays = Math.round((Date.now() - timestamp) / 86400000);
        var diffHrs = Math.round(((Date.now() - timestamp) % 86400000) / 3600000);
        var diffMins = Math.round((((Date.now() - timestamp) % 86400000) % 3600000) / 60000);
        if (diffDays == 0) {
            if (diffHrs == 0) {
                return diffMins + " minutes ago";
            } else {
                return diffHrs + " hours ago";

            }
        } else {
            return diffDays + " days ago";

        }
    }
    renderReply(parentComment) {

        return ( <
            ul class = "comments-list" >

            {

                this.state.comments.map(comment => (

                    comment.parentId == parentComment.id &&
                    <
                    li class = "comment"
                    key = {
                        comment.id
                    } >
                    <
                    a class = "pull-left"
                    href = "#" >
                    <
                    img class = "avatar"
                    src = {
                        comment.photourl
                    }
                    alt = "avatar" / >
                    <
                    /a> <
                    div class = "comment-body" >
                    <
                    div class = "comment-heading" >
                    <
                    h4 class = "user" > {
                        comment.owner
                    } < /h4> <
                    h5 class = "time" > {
                        this.covertTimestamp(comment.timestamp)
                    } < /h5> <
                    /div> <
                    p > {
                        comment.text
                    } < /p> <
                    div class = "stats" >
                    <
                    a onClick = {
                        this.handleLike.bind(this, comment)
                    }
                    class = "btn btn-default stat-item" >
                    <
                    i class = "fa fa-thumbs-up icon" > < /i>{comment.likes} <
                    /a> <
                    a onClick = {
                        this.handleDisLike.bind(this, comment)
                    }
                    class = "btn btn-default stat-item" >
                    <
                    i class = "fa fa-thumbs-down icon" > < /i>{comment.dislikes} <
                    /a>

                    <
                    /div> <
                    /div> <
                    /li>

                ))
            } <
            /ul>
        );
    };


    handleLike(value) {
        let updateComment = this.state.comments;
        for (let i = 0; i < updateComment.length; i++) {
            if (updateComment[i].id == value.id) {
                updateComment[i].likes = updateComment[i].likes + 1;
                break;
            }
        }
        this.setState(updateComment);

        localStorage.setItem('commentTree', JSON.stringify(this.state));
        console.log(JSON.parse(localStorage.getItem('commentTree')));
    };
    handleDisLike(value) {
        let updateComment = this.state.comments;
        for (let i = 0; i < updateComment.length; i++) {
            if (updateComment[i].id == value.id) {
                updateComment[i].dislikes = updateComment[i].dislikes + 1;
                break;
            }
        }
        this.setState(updateComment);

        localStorage.setItem('commentTree', JSON.stringify(this.state));
    };
    handleReply(e) {
        e.target.parentNode.nextSibling.style.display = "block";
    };

    handleComment(e) {
        if (e.keyCode == 13) {

            let updateComment = this.state.comments;
            let comment = e.target.value;
            e.target.value = "";
            let parentid;
            if (e.target.id) {
                parentid = e.target.id;
            } else {
                parentid = null;
            }
            updateComment.push({

                "id": Math.random(),
                "owner": "Nishanth",
                "text": comment,
                "photourl": "http://bootdey.com/img/Content/user_1.jpg",
                "timestamp": Date.now(),
                "likes": 0,
                "dislikes": 0,
                "parentId": parentid,


            });
            this.setState(updateComment);

            localStorage.setItem('commentTree', JSON.stringify(this.state));
            console.log(updateComment);

        }
    };


    render() {
        return ( <
            div >
            <
            div class = "container" >
            <
            div class = "col-sm-12" >
            <
            div class = "panel panel-white post panel-shadow" >


            <
            div class = "post-footer" >
            <
            div class = "input-group" >
            <
            input onKeyDown = {
                this.handleComment.bind(this)
            }
            class = "form-control"
            placeholder = "Join the discussion"
            type = "text" / >
            <
            span class = "input-group-addon" >
            <
            a href = "#" > < i class = "fa fa-edit" > < /i></a >
            <
            /span>

            <
            /div> <
            ul class = "comments-list" > {
                this.state.comments.map(comment => (
                    comment.parentId == null &&
                    <
                    li class = "comment"
                    key = {
                        comment.id
                    } >
                    <
                    a class = "pull-left"
                    href = "#" >
                    <
                    img class = "avatar"
                    src = {
                        comment.photourl
                    }
                    alt = "avatar" / >
                    <
                    /a> <
                    div class = "comment-body" >
                    <
                    div class = "comment-heading" >
                    <
                    h4 class = "user" > {
                        comment.owner
                    } < /h4> <
                    h5 class = "time" > {
                        this.covertTimestamp(comment.timestamp)
                    } < /h5> <
                    /div> <
                    p > {
                        comment.text
                    } < /p> <
                    div class = "stats"
                    name = {
                        comment.id
                    } >
                    <
                    a onClick = {
                        this.handleLike.bind(this, comment)
                    }
                    class = "btn btn-default stat-item" >
                    <
                    i class = "fa fa-thumbs-up icon" > < /i>{comment.likes} <
                    /a> <
                    a onClick = {
                        this.handleDisLike.bind(this, comment)
                    }
                    class = "btn btn-default stat-item" >
                    <
                    i class = "fa fa-thumbs-down icon" > < /i>{comment.dislikes} <
                    /a> <
                    a onClick = {
                        this.handleReply.bind(this)
                    }
                    class = "btn btn-default stat-item" >
                    Reply <
                    /a>

                    <
                    /div> <
                    div style = {
                        {
                            display: 'none'
                        }
                    } >
                    <
                    input onKeyDown = {
                        this.handleComment.bind(this)
                    }
                    id = {
                        comment.id
                    }
                    class = "form-control reply"
                    placeholder = "write a reply"
                    type = "text" / >


                    <
                    /div> <
                    /div>

                    {
                        this.renderReply(comment)
                    } <
                    /li>
                ))
            } <
            /ul>

            <
            /div> <
            /div> <
            /div> <
            /div>


            <
            /div>
        );
    }
}
