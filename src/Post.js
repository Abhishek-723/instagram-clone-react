import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({key, post}) {
    return (
        <div className="post">
            <div className="post__header">
            <Avatar className="post__avatar" alt="Abhishek" src={post.imageUrl}/>
            <h3>{post.username}</h3>
            </div>
            <img className="post__image" src={post.imageUrl} alt="" />
            <p className="post__Text"><strong>{post.username}</strong> {post.caption}</p>
        </div>
    )
}

export default Post