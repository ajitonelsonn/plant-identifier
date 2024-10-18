# Plant Identifier

**Plant Identifier** is an AI-powered web application that identifies plants from images using LLMA 3.2 model. It provides users with plant identification and care tips, perfect for gardening enthusiasts and professionals.

## Video Demonstration

Check out our video demonstration to see Plant Identifier in action:

[![Plant Identifier Demo](/public/demo.png)](https://www.facebook.com/share/v/UWet4uf8RQNtzgfF/)

Click on the image above to watch the video on Facebook.

### Features in the Video:

- Account registration
- Secure login
- Plant identification with a photo
- Account management (including account deletion, edit password, edit profile)

## Live Demo

Try the live demo at [plantaitl.online](https://plantaitl.online/)

**Getting Started**:

1. Visit the site.
2. Register and verify your email.
3. Log in to begin identifying plants.

## Key Features

- **Image Upload**: AI-based identification from plant images.
- **Plant Details**: View detailed information and care tips.
- **User Authentication**: OTP email verification for secure login.
- **Responsive Design**: Accessible on desktop and mobile.
- **Profile Management**: Save and manage your plant collection.

## How It Works

1. **Sign Up**: Register with OTP email verification.
2. **Upload Image**: Upload or capture an image of a plant.
3. **AI Processing**: Image analyzed via TOGETHER API (Llama 3.2 model).
4. **Identification**: Get plant information and care tips.
5. **Save Plants**: Manage identified plants in your profile.

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, PostgreSQL
- **Authentication**: JWT, OTP via email
- **API**: TOGETHER API (Llama 3.2 model)
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

3. Set environment variables:

   Create a `.env.local` file from `.env.local_copy`. Click this for more about [.env.local](https://github.com/ajitonelsonn/plant-identifier/commit/f33b262bda43d8a31dd419988d03884fdc97d4b2#commitcomment-147938686)

4. Set up the database:

   Run `database_setup.sql` to initialize PostgreSQL.

5. Build and run:

   ```bash
   npm run build
   npm start
   ```

6. Visit `http://localhost:3000` in your browser.

## API Routes

- `/api/check-auth`: Verify user authentication.
- `/api/check-availability`: Check username/email availability.
- `/api/generate-care-tips`: Generate plant care tips.
- `/api/identify-plant`: Identify plants.
- `/api/register`: User registration and OTP verification.
- `/api/profile`: Manage user profiles.
- `/api/forgot-password`: Password reset requests.
- `/api/reset-password`: Reset passwords.
- `/api/change-password`: Change passwords.
- `/api/login`: User login.
- `/api/logout`: User logout.
- `/api/send-otp`: Send OTP for verification.
- `/api/plant-identifications`: Manage identified plants.

## Learn More

- **System Architecture Diagram**: [View here](https://github.com/ajitonelsonn/plant-identifier/tree/main/diagram_system/System%20Architecture%20Diagram).
- **Flow Chart**: [View here](https://github.com/ajitonelsonn/plant-identifier/tree/main/diagram_system/Application%20Flow).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
