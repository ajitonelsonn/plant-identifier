# Plant Identifier

**Plant Identifier** is an AI-powered web application that helps users identify plants from images using machine learning. With a user-friendly interface, it offers plant identification and care tips, making it perfect for both gardening enthusiasts and professionals.

## Video Demonstration

Check out our video demonstration to see Plant Identifier in action:

[![Plant Identifier Demo](/public/demo.png)](https://www.facebook.com/share/v/UWet4uf8RQNtzgfF/)

Click on the image above to watch the video on Facebook.

### Features Highlighted in the Video:

✅ Register for an account
✅ Log in securely
✅ Identify plants with just a photo
✅ Manage your account (including how to delete it if needed)

## Live Demo

Try out the live demo at [https://plantaitl.online/](https://plantaitl.online/)

To get started:

1. Visit the site
2. Register and verify your email
3. Log in and begin identifying plants

## Key Features

- **Image Upload**: Upload plant images for AI-powered identification.
- **Plant Details**: View detailed information on identified plants.
- **User Authentication**: Secure login with OTP email verification.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Profile Management**: Save identified plants and manage your collection.

## How It Works

1. **Sign Up**: Users register with OTP email verification.
2. **Upload Image**: Upload or take a plant image.
3. **AI Processing**: The TOGETHER API (Llama 3.2 model) analyzes the image.
4. **Plant Identification**: Receive detailed plant information and care tips.
5. **User Profiles**: Save and track identified plants.

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, PostgreSQL
- **Authentication**: JWT, OTP for email verification
- **APIs**: TOGETHER API (Llama 3.2 model)
- **Deployment**: Vercel

## Installation Guide

1. Clone the repository:

   ```bash
   git clone https://github.com/ajitonelsonn/plant-identifier.git
   cd plant-identifier
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set environment variables by creating a `.env.local` file from the `.env.local_copy`.

4. Set up the PostgreSQL database by running `database_setup.sql`.

5. Build and run the application:

   ```bash
   npm run build
   npm start
   ```

6. Visit `http://localhost:3000` in your browser.

## API Routes

- `/api/check-auth`: Verifies user authentication.
- `/api/check-availability`: Checks username/email availability.
- `/api/generate-care-tips`: Generates plant care tips.
- `/api/identify-plant`: Processes plant identification.
- `/api/register`: Manages user registration and OTP verification.
- `/api/profile`: Manages user profiles.
- `/api/forgot-password`: For Forgot Password.
- `/api/reset-password`: For reset password.

## Learn More

- For the **System Architecture Diagram**, visit [this link](https://github.com/ajitonelsonn/plant-identifier/tree/main/diagram_system/System%20Architecture%20Diagram).
- For the **Flow Chart**, visit [this link](https://github.com/ajitonelsonn/plant-identifier/tree/main/diagram_system/Application%20Flow).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
