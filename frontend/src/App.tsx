
import { SignedIn, SignedOut, SignInButton, SignUp, UserButton } from "@clerk/clerk-react";
import './App.css'

function App() {

  return (
    <>
    <div>
      <header className='Header'>
          <SignUp>
          </SignUp>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
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
