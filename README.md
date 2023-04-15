# 🎭 Welcome to Artistic Hub! 🎭

Artistic Hub is a web application built using the MERN stack (MongoDB, Express, React, and Node.js) and React Vite. It allows artists to register and post their artworks in the hub, and others can view and comment on them without logging in. However, only logged-in users can post comments on the artworks.
Hosting

Artistic Hub is hosted on Vercel, a cloud platform for static sites and serverless functions.
Installation

To use Artistic Hub locally, please follow the instructions below:

    1.Clone the repository to your local machine.
    2.Navigate to the root folder of the application in your terminal.
    3.Run npm install to install the dependencies.
    4.Run npm run dev to start the development server.

## 🖊️ Features

Artistic Hub has the following features:

    Registration: Artists can register by providing their name, email, and password.
    Login: Registered users can log in to their account using their email and password.
    Post Artworks: Logged-in users can post their artworks, which will be visible to others in the hub.
    View Artworks: Visitors can view the artworks posted by artists, including the name of the artist and a link to their profile.
    Comments: Visitors can view comments on artworks but cannot post comments unless logged in. Logged-in users can post comments on artworks.
    Artist Profiles: Visitors can view an artist's profile, which includes their name, email, and all their artworks.

## ⚓ Responsive Layout

Artistic Hub is designed with a responsive layout using Tailwind CSS. This means that the user interface adapts to different screen sizes, such as desktop, tablet, and mobile. Tailwind CSS provides a variety of responsive utility classes that make it easy to create a responsive design. For example, the md: prefix is used for medium-sized screens and above, while the sm: prefix is used for small-sized screens and above.
Customizing the Design

Tailwind CSS allows developers to customize the default design by configuring a tailwind.config.js file. In Artistic Hub, the default colors, fonts, and spacing were customized to match the brand identity. For example, the primary color was changed to a shade of blue, and the font family was changed to a sans-serif font. The tailwind.config.js file also includes some additional customizations, such as adding a dark variant for dark mode and disabling some default styles that were not needed in the application.
Styling Components

In addition to using utility classes, Tailwind CSS provides a way to define custom component styles using the @apply directive. This makes it easy to create reusable styles for components, such as buttons, forms, and cards. In Artistic Hub, custom component styles were defined in the client/src/index.css file using the @apply directive. For example, a custom button style was defined as follows:

```
    .btn {
        @apply inline-flex items-center justify-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
        }
```

This style can then be applied to any element with the btn class, such as a button or a link.

## File Structure

The following is the file structure of the Artistic Hub application:

    ├── frontend
    │   ├── node_modules
    │   ├── public
    │   ├── src
    │   ├── package.json
    │   ├── README.md
    │   └── vite.config.js
    │   └── tailwind.config.js
    ├── models
    │   ├── comment.js
    │   └── user.js
    |   └── post.js
    ├── routes
    │   ├── postRoutes.js
    ├── controllers
    │   ├── userControllers.js
    │   └── postControllers.js
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── app.js

The client folder contains the React-Vite front-end code, while the models, routes, and utils folders contain the back-end code. The server.js file is the entry point for the back-end code.

## Environment Variables

The following environment variables are used in Artistic Hub:

    MONGODB_URI: The URI of the MongoDB database.
    SECRET_KEY: The secret key for generating JSON Web Tokens.
    NODE_ENV: Development or production environment.
    PORT: Backend port number

### Note: An .env file is required to set the above environment variables.

# ✈️ Conclusion

Artistic Hub is a web application that allows artists to showcase their artworks and visitors to view and comment on them. It is built using the MERN stack and React Vite, and is hosted on Vercel. The code is well-structured and easy to understand.
Tailwind CSS was used extensively in the Artistic Hub web application to create a responsive design and customize the default styles. By using utility classes and custom component styles, the user interface was designed to be visually appealing and easy to use. If you are interested in learning more about Tailwind CSS, check out the official documentation at https://tailwindcss.com/docs. If you have any questions or feedback, please contact the Artistic Hub team at pradeshgv@gmail.com.
