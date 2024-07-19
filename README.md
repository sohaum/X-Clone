# X Clone

Welcome to the **X Clone** project, a full-stack web application designed to emulate the core functionalities of a social media platform. This project is built using modern technologies including React, Node.js, Express, MongoDB, and Firebase.

![image](https://github.com/sohaum/X-Clone/assets/127203784/7c516622-d7d9-416c-980a-de0471e6be91)

![image](https://github.com/sohaum/X-Clone/assets/127203784/0766d4ab-a0ca-4681-bf4e-85e77b3c9255)

![image](https://github.com/sohaum/X-Clone/assets/127203784/4f365e7c-86f8-4f05-a8f2-8329d7533d55)


## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Project Overview

**X Clone** is a social media web application that allows users to sign up, log in, post updates, and interact with other users.

## Features

- User Authentication (Email/Password and Google Sign-In)
- Create, Read, Update, Delete Posts
- User Profiles
- Explore and Search Functionality
- Responsive Design

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces
- **React Router**: For routing within the application
- **Material-UI**: For UI components
- **Axios**: For making HTTP requests
- **Firebase**: For authentication and hosting

### Backend

- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB

## Installation

### Prerequisites

- Node.js
- npm
- MongoDB
- Twilio Account (for OTP functionality)
- Firebase Account (for authentication)

### Clone the Repository

```bash
git clone https://github.com/sohaum/X-Clone.git
cd X-Clone
```

### Backend Setup

1. Navigate to the `backend` directory and install the dependencies:

```bash
cd backend
npm install
```
2. Create a .env file in the backend directory and add the following environment variables:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
3. Start the backend server:
```bash
npm run start
```

### Frontend Setup

1. Navigate to the frontend directory and install the dependencies:
```bash
cd frontend
npm install
```
2. Create a .env file in the frontend directory and add the following environment variables:
```bash
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```
3. Start the frontend development server:
```bash
npm start
```

### Usage
Once both the backend and frontend servers are running, you can access the application at http://localhost:3000.

- Sign up or log in to your account.
- Post updates, explore content, and interact with other users.

### Contributing
I'd welcome contributions to enhance the features and improve the project. To contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Make your changes
4. Commit your changes (git commit -m 'Add some feature')
5. Push to the branch (git push origin feature-branch)
6. Open a Pull Request
