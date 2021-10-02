import './App.css';
import Post from './Post'
import ImageUpload from './ImageUpload';
import { useState, useEffect } from 'react';
import {auth, db} from './firebase'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function App() {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);


    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })))
        })
    }, []);

    useEffect(() => {
        const unsubsribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                //user has logged in
                setUser(authUser);
            } else{
                // user is logged out
                setUser(null);
            }
        })

        return () => {
            unsubsribe();
        }
    }, [username]);

    const handleLogOut = () => {
        auth.signOut();
    }

    const clearInputs = () => {
        setPassword('');
        setEmail('');
        setUsername('');
        setOpen(true);
    }
    
    const signUp = (event) => {

        event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
             return authUser.user.updateProfile({
                displayName: username,
            })
        })
        .catch((error) => alert(error.message));

        setOpen(false);
    }

    const signIn = (event) => {

        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .catch((error) =>
            alert(error.message)
        )

        setOpenSignIn(false);
    }

  return (
    <div className="App">

        
        <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={style} className="signup-box">
        <form>
          <center>
          <img className="app__headerImage" src="https://www.pngfind.com/pngs/m/2-23180_instagram-1-logo-png-transparent-instagram-name-logo.png" alt="" />
          <Input 
            type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}
          />
          <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" onClick={signUp} >SignUp</Button>
          </center>
          </form>
      </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={style} className="signup-box">
        <form>
          <center>
          <img className="app__headerImage" src="https://www.pngfind.com/pngs/m/2-23180_instagram-1-logo-png-transparent-instagram-name-logo.png" alt="" />
          <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" onClick={signIn} >Login</Button>
          </center>
          </form>
      </div>
      </Modal>
      <div className="app__header">
          <img className="app__headerImage" src="https://www.pngfind.com/pngs/m/2-23180_instagram-1-logo-png-transparent-instagram-name-logo.png" alt="" />
          {
              user ? (
                <Button onClick={handleLogOut}>Logout</Button>
              ) : (
                <div className="appSignIn__container">
                    <Button onClick={clearInputs}>Sign Up</Button>
                    <Button onClick={ () => setOpenSignIn(!openSignIn)}>Sign In</Button>
                </div>
              )
          }
              
      </div>
      {
          posts.map((post) => (
              <Post postId={post.id} user={user} post={post.post} />
          ))
      }
      {user?.displayName ? (
            <ImageUpload  username={user.displayName}/>
        ) : (
            <h3>Please log in to create your own post</h3>
        )}
    </div>
  );
}

export default App;
