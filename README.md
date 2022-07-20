# movies-explorer-frontend
React front end for Yandex Practicum web development diploma project

[https://movies.418co.de](https://movies.418co.de)


Project scope: Make a simple search through a list of 100 movies from [beatfilm festival dataset public api](https://api.nomoreparties.co/beatfilm-movies) and present the result as clickable cards that lead to youtube previews with ability to save and search saved cards for each registered user.

Features: 
- Implement semi-randomly generated [Figma design](https://www.figma.com/file/E1rryxHLMEKjSFYM7ddN3m/?node-id=891%3A3857)
- React routes with auth wrapper component
- User registration, login, and http-only cookies auth
- Editable user name, email, and language (react-intl)
- Custom form validation with a custom hook
- JSON card data wrangling
- Search through movie cards with a short film modifier
- Youtube trailer preview on card click
- Loader displaying next N movie cards
- Save movie cards to my backend
- Persistant app state with localStorage
- BEM naming CSS style system
- Custom domain, GCP debian VM with Nginx, Let's Encrypt SSL certificate

Node/Express/MongoDB backend:

[https://api.movies.418co.de](https://api.movies.418co.de) \
[Github](https://github.com/418code/movies-explorer-api) 

- Node / Express: middlewares, routers, controllers, REST api, error handling
- MongoDB / Mongoose: schemas, models, CRUD operations, refs, statics
- Security: bcrypt password hashing, Celebrate / Joi + MongoDB validation with regex matching, JWT token, http only cookies, rate limiter, winston loggers, .env production variables, pinned npm package versions
- Google Compute Platform: debian VM, Nginx with proxy pass, PM2 with auto reload, Let's Encrypt SSL certificate, dynamic DNS, custom domain
