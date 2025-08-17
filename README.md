# 🐾 Digital PetCare

## Introduction

**Digital PetCare** is an online platform designed to simplify pet care
for busy pet owners. From pet sitting and delivery of pet accessories to
health consultations and training, Digital PetCare provides all-in-one
solutions to keep your pets healthy and happy.

This system integrates a **Node.js backend**, **MongoDB database**, and
a **responsive frontend** for smooth user interaction.

------------------------------------------------------------------------

## Features

-   🐶 **Pet Sitting** -- Book professional pet sitters.\
-   📦 **Delivery Services** -- Order pet food, medicines, and
    accessories with doorstep delivery.\
-   🎓 **Pet Training** -- Connect with trainers to improve your pet's
    behavior.\
-   🩺 **Veterinary Care** -- Online consultations and health tracking.\
-   💻 **User-Friendly Interface** -- Clean and intuitive design.\
-   ⏱ **Reminders & Notifications** -- Stay updated on appointments and
    pet care schedules.\
-   🤖 **Real-Time Assistance** -- Integrated assistant for user
    guidance.

------------------------------------------------------------------------

## System Architecture

-   **Frontend**: HTML, CSS, JavaScript\
-   **Backend**: Node.js (Express)\
-   **Database**: MongoDB (via Mongoose)\
-   **Communication**: REST APIs\
-   **Authentication**: JWT (via `/api/auth` routes)\
-   **Email Services**: Nodemailer with SMTP

------------------------------------------------------------------------

## Technologies Used

-   **HTML/CSS** → Structure and styling of pages\
-   **JavaScript** → Dynamic client-side features\
-   **Node.js (Express)** → Backend framework\
-   **MongoDB + Mongoose** → Database management\
-   **Nodemailer** → Email/notification service\
-   **dotenv** → Environment variable management

------------------------------------------------------------------------

## Installation

### 1. Clone the Repository

``` bash
git clone https://github.com/username/DigitalPetCare.git
cd DigitalPetCare
```

### 2. Install Dependencies

Make sure you have **Node.js** and **npm** installed. Then run:

``` bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (already provided in your
repo) and set up:

``` env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@example.com
SMTP_PASS=your_password

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/DigitalPetCare

# Server Port
PORT=5000
```

### 4. Run the Application

``` bash
npm start
```

Server will run at:\
👉 <http://localhost:5000>

### 5. Access the Frontend

Visit:\
👉 <http://localhost:5000/>

------------------------------------------------------------------------

## Folder Structure

    DigitalPetCare/
    │── server.js        # Main server entry
    │── .env             # Environment variables
    │── home.html        # Homepage
    │── routes/          # API routes (auth, pets, healthUpdates, reminders)
    │── uploads/         # Uploaded images & assets
    │── styles/          # CSS files
    │── js/              # Frontend JS scripts

------------------------------------------------------------------------

## Future Enhancements

-   Mobile App Integration\
-   AI-powered Pet Health Monitoring\
-   Subscription Plans for Pet Services
