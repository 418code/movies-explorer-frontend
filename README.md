# Movies explorer

React front end for Yandex Practicum web development diploma project

[https://movies.418co.de](https://movies.418co.de)


Project scope: Make a simple search through a list of 100 movies from [beatfilm festival dataset public api](https://api.nomoreparties.co/beatfilm-movies) and present the result as clickable cards that lead to youtube previews with ability to save and search saved cards for each registered user.


User features:
- User registration and login
- Search through movie cards and saved movie cards with a short film modifier
- Youtube trailer preview on card click
- Save movie cards to my backend
- Delete saved movie cards from my backend
- Loader displaying next N movie cards
- Editable user name, email, and language
  
Technical features: 
- Implement semi-randomly generated responsive [Figma design](https://www.figma.com/file/E1rryxHLMEKjSFYM7ddN3m/?node-id=891%3A3857)
- React routes with auth wrapper component
- http-only cookies authentication
- Persistant app state with localStorage
- i18n with react-intl
- Custom form validation with a custom hook
- JSON card data wrangling
- BEM naming CSS style system
- Custom domain, GCP debian VM with Nginx, Let's Encrypt SSL certificate

Node/Express/MongoDB backend:

[https://api.movies.418co.de](https://api.movies.418co.de) \
[Github](https://github.com/418code/movies-explorer-api) 

Technical features:
- Node / Express: middlewares, routers, controllers, REST api, error handling
- MongoDB / Mongoose: schemas, models, CRUD operations, refs, statics
- Security: bcrypt password hashing, Celebrate / Joi + MongoDB validation with regex matching, JWT token, http only cookies, rate limiter, winston loggers, .env production variables, pinned npm package versions
- Google Compute Platform: debian VM, Nginx with proxy pass, PM2 with auto reload, Let's Encrypt SSL certificate, dynamic DNS, custom domain

Steps to run the full app locally:
1. Install MongoDB (tested with V5) and NodeJS (tested with V16)
2. Clone [backend](https://github.com/418code/movies-explorer-api) and [frontend](https://github.com/418code/movies-explorer-frontend) locally and install dependencies with `npm install` in each folder
3. Run `npm run dev` in the backend folder and `npm run start` in the frontend folder
4. Use the app at http://localhost:3001/
