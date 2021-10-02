import React, { useEffect, useState } from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase';
import firebase from 'firebase'

function Post({postId, user, post}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const [error, setError] = useState('');

    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db.collection("posts").doc(postId).collection("comments")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })
        }

        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        if(user){
            db.collection("posts").doc(postId).collection("comments").add({
                text: comment,
                username: user.displayName,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        else{
            alert("You are not logged in")
        }

        setComment('');
    }

    return (
        <div className="post">
            <div className="post__header">
            <Avatar className="post__avatar" alt="Abhishek" src={post.imageUrl}/>
            <h3>{post.username}</h3>
            </div>
            <img className="post__image" src={post.imageUrl} alt="" />
            <p className="post__Text"><strong>{post.username}</strong> {post.caption}</p>
            <div className="comment__section">
                {comments.map((comment) => (
                    <p><strong>{comment.username}</strong> {comment.text}</p>
                ))}
                <form>
                    <input type="text"
                    className="post__input"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="post__button" disabled={!comment} type='submit' onClick={postComment}>Comment</button>
                </form>
            </div>
        </div>
    )
}

export default Post