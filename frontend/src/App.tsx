
import { SignedIn, SignedOut, SignInButton, SignUp, useAuth, UserButton } from "@clerk/clerk-react";
import './App.css'
import { useEffect, useState } from "react";

interface Post {
  title: string;
  content: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (loading) {
      //set timeout so loading turns false after 5s
      setTimeout(() => {
        setLoading(false)
      }, 5000)
    }
  }, [loading])

  // in my fetch request, I need to include the token in the headers
  async function getPosts() {
    setLoading(true)
    const userToken = await getToken()

    if (!isSignedIn) {
      console.log("You are not signed in")
      return
    }

    const response = await fetch('http://localhost:3000/posts', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })

    console.log(response) // this does nothing!

    // 1. get the data
    const json = await response.json()
    const posts = json.data.posts
    console.log(json.data.posts)
    setPosts(json.data.posts)
    // 2. save the data to state in the component
    setLoading(false)
  }

  // 1. create a post -- send the post to the database using fetch
  // 2. get all posts -- fetch all posts from the database for the current user

  return (
    <>
      <div>
        <header className='Header'>
          <SignedOut>
            <SignInButton />
            <SignUp />
          </SignedOut>
          <SignedIn>
            <UserButton />
            <button disabled={loading} style={{ marginTop: "20px", marginLeft: "20px" }} onClick={getPosts}>Get Posts</button>
            <ul>
              {posts.map((post, index) => {
                return <li key={index}>{post.title} - {post.content}</li>
              })}
            </ul>
          </SignedIn>
        </header>
      </div>
      <div>
        <p className="main-body">Welcome to my page!</p>
      </div>
    </>
  )
}

export default App
