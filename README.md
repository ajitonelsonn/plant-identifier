# Plant Identifier

Plant Identifier is an AI-powered web application that helps users identify plants from images. With an easy-to-use interface and advanced machine learning algorithms, it's the perfect tool for gardeners, nature enthusiasts, and anyone curious about the flora around them.

## Video Demonstration

Check out our video demonstration to see Plant Identifier in action:

<iframe width="560" height="315" src="https://www.youtube.com/embed/-u6xq7OWdnc?si=JNgVwXDTmx2cZKWD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This video walks you through the main features of our application, including:

- User registration and login
- Uploading plant images
- Receiving plant identifications and care tips
- Managing your plant collection

## Live Demo

Visit our live demo at [https://plantaitl.online/](https://plantaitl.online/)

To get started:

1. Go to [https://plantaitl.online/](https://plantaitl.online/)
2. Click on the "Register" button to create your account
3. Verify your email with the OTP sent to you
4. Log in and start identifying plants!

## Features

- **Image Upload and Analysis**: Users can upload plant images for AI-powered identification.
- **Detailed Plant Information**: Get comprehensive details about identified plants.
- **User Authentication**: Secure user registration and login system with OTP verification.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Profile Management**: Users can create and manage their profiles.

## How It Works

1. **User Registration**:
   - Users can sign up with email verification through OTP.
   - Username and email availability are checked before registration.
2. **Image Upload**: Users can upload an image of a plant or take a photo directly through the app.
3. **AI Analysis**: Our advanced AI, powered by the TOGETHER API and Llama 3.2 model, analyzes the image.
4. **Identification**: The app provides detailed information about the identified plant, including its name, scientific name, family, and care instructions.
5. **User Profiles**: Users can create accounts to save their identified plants and track their botanical discoveries.

## Technologies Used

- **Frontend**:
  - Next.js 14
  - React
  - TypeScript
  - Tailwind CSS
- **Backend**:
  - Node.js
  - PostgreSQL
- **Authentication**:
  - JWT (JSON Web Tokens)
  - OTP for email verification
- **APIs**:
  - TOGETHER API (Llama 3.2 model)
- **Deployment**:
  - Vercel

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/ajitonelsonn/plant-identifier.git
   cd plant-identifier
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` like .env.local_copy file in the root directory.

4. Set up the database:
   Run the SQL commands provided in `database_setup.sql` to create the necessary tables.

5. Build the project:

   ```
   npm run build
   ```

6. Start the server:

   ```
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

## API Routes

Our application uses the following API routes:

1. `/api/check-auth`: Verifies the authentication status of a user.
2. `/api/check-availability`: Checks the availability of a username or email during registration.
3. `/api/generate-care-tips`: Generates care tips for identified plants.
4. `/api/identify-plant`: Processes uploaded images for plant identification.
5. `/api/login`: Handles user login and authentication.
6. `/api/logout`: Manages user logout process.
7. `/api/plant-identifications`: Manages user's plant identification history.
8. `/api/profile`: Handles user profile operations (view, update, delete).
9. `/api/register`: Manages new user registration process.
10. `/api/send-otp`: Sends one-time passwords for email verification during registration or password reset.

These API routes form the backbone of our application, handling everything from user authentication to plant identification and care tip generation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
