# Natours App

## Introduction 🌟

Welcome to Natours! This application is designed to showcase the beauty of nature and provide adventurous tours to various destinations. Experience breathtaking landscapes, exciting activities, and a community of fellow nature enthusiasts. Dive into the wild with Natours!

## Natours App Screenshots 📷

Explore these screenshots to get a glimpse of the Natours app:

![Screenshot 1](https://imgur.com/GMIYygn)
*Caption: Log into your account*

![Screenshot 2](https://imgur.com/gf7YQnG)
*Caption: Your account settings*




## Technologies 🚀

- Node.js
- Express.js
- MongoDB
- Mongoose
- HTML, CSS
- Pug (Template Engine)
- Mapbox
- Stripe
- JSON Web Token
- Nodemailer
- Gmail

## Features ✨

- Browse and book a variety of nature tours.
- Detailed information about each tour, including duration, difficulty, and price.
- User authentication and account management.
- Interactive maps to visualize tour destinations.
- Tour reviews and ratings by fellow travelers.

## Setting Up Your Local Environment

Follow these steps to set up your local environment for the Natours app:

1. **Clone the Repository:**
   Clone this repository to your local machine:
   ```bash
   git clone https://github.com/Moaz-ashraf1/natours.git
   cd natours
   ```
2. **Install Dependencies:**
   Run the following command to install all the required dependencies:
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**

   Before you can run the Natours app, you need to set up your environment variables. These variables store sensitive information required for the app to function properly. Follow these steps to configure your environment variables:

   1. **Create a `.env` File:**
      In the root directory of the app, create a file named `.env`.

   2. **Add the Following Environment Variables:**
      Replace the placeholders with your actual information. You might need to sign up for accounts and services to obtain the required credentials.

      ```dotenv
      
      # MongoDB Configuration
      DATABASE=your-mongodb-database-url
      USERNAME=your-mongodb-username 
      DATABASE_PASSWORD=your-mongodb-password

      # JSON Web Token Configuration
      SECRET=your-json-web-token-secret
      JWT_EXPIRES_IN=90d
      JWT_COOKIE_EXPIRES_IN=90

      # Stripe Configuration
      STRIPE_SECRET_KEY=your-stripe-secret-key
      STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

      ```
## Project Demo 🎬

Explore the Natours app in action:

[**Natours App Demo**](https://natours-moaz.up.railway.app/my-tours)

Witness the magic and start your journey today! 🌄

   
