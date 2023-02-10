To Repro:

1. Install node_modules in backend
2. Start server `npm run start`

You can test it with Apollo Playground by going to `localhost:4000/graphql` or you can also repro it using the frontend:

3. Install node_modules in frontend
4. Start app `npm run dev`

5. Open `localhost:7000` on a browser and press login
6. Notice the network tab in devtools, the response is recieved with the `Set-Cookie` but is not set in the Cookie storage (Application -> Cookies in devtools)
