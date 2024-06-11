import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import {
    ClerkExpressRequireAuth,
    ClerkExpressWithAuth,
    LooseAuthProp,
    WithAuthProp,
} from '@clerk/clerk-sdk-node';
import express from 'express';
import type { Application, Request, Response } from 'express';

const PORT = 3000;

const app = express();

declare global {
    namespace Express {
        interface Request extends LooseAuthProp { }
    }
}

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})


app.get('/posts', ClerkExpressRequireAuth(), (req: WithAuthProp<Request>, res) => {
    console.log(req.headers)
    res.send({
        data: {
            posts: [ // TODO: get the user's posts from the database
                {
                    title: 'Post 1',
                    content: 'This is the first post'
                },
                {
                    title: 'Post 2',
                    content: 'This is the second post'
                },
            ]
        }
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send('Unauthenticated!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})