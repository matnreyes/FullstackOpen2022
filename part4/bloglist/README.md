# [Bloglist](https://matnreyes-bloglist.fly.dev/)

Bloglist is a fullstack application that allows users to store information regarding blogs they've come across on the internet. Bloglist has multi-user support and allows for users to vote on which blog they like.

## Technologies / Purpose
**[Front end](https://github.com/matnreyes/FullstackOpen2022/tree/main/part5/bloglist-frontend):**
- React (useEffect, useRef)
- Axios

Demonstrates ability to create conditionally rendered components, client-side user authentication, basic CSS styling, and multi-user support.

**Back end:**
- Node.js
- Express
- Mongoose / MongoDB
- Jest (testing)
- JSONWebToken + Bcrypt (user auth)

Demontrates ability to create a Node app with different route handlers. Routes handle user login, user management, and blog submission. JSWT is used to autheticate users and Bcrypt allows for secure storage of password hash. Mongoose Unique Validators prevent from multiple users having same username. 