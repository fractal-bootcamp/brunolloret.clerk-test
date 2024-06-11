### Recipe to Create Authentication on a React App and get Resources from the Server:


1. First, create a react app `bun create vite`
2. Then, add client-side auth using Clerk (or other similar Auth Provider)
3. CLIENT: When I'm logged in, I can get the userToken and display hidden information only when signed in
4. CLIENT: Try to get a Resource from The Server (`fetch`) and Include your userToken as part of the Request `authorization` Header
5. BECAUSE I need a way to get resources:
6. Build a Server: start a typescript project `bun init`
7. Make an express app: `bun i express @types/express`
8. listen on the basic port and all that jazz
9. Setup how to authenticate a request (almost certainly means verifying a JWT)... in [clerk's case](https://clerk.com/blog/how-to-authenticate-api-requests-with-clerk-express): `bun i @clerk/clerk-sdk-node`
10. lock the resources behind authentication by including it as middleware on protected routes
11. add a database so you are only getting that user's resources