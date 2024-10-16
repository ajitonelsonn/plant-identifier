# Plant Identifier Application Flow

![Plant Identifier Demo](/diagram_system/Application%20Flow/Application_Flow.png)

## Workflow Explanation

1. **Start**

   - The user begins their journey with the Plant Identifier app.

2. **Authentication Check**

   - If not authenticated, the user is directed to the Login/Register page.
   - If authenticated, they proceed directly to the Dashboard.

3. **Login/Register Process**

   - Users can choose to register a new account or login.
   - New accounts require email verification.
   - Login attempts are authenticated.

4. **Dashboard Access**

   - Upon successful authentication, users access their dashboard.

5. **Image Upload**

   - Users can choose to upload an existing image or take a new photo.
   - The selected/captured image is processed for identification.

6. **Plant Identification**

   - The processed image is sent to the Together AI API.
   - The API returns plant identification results.

7. **Care Tips Generation**

   - Based on the identified plant, care tips are generated.

8. **Result Display**

   - The plant identification results and care tips are displayed to the user.

9. **Save to Collection**

   - Saved, the data is stored in the database and the user's profile is updated.

10. **End**
    - The process concludes with either saving the identification or simply viewing the results.

## Key Points

- **Decision nodes** (diamonds) represent points where the flow can take different paths based on user actions or system checks.
- **Green boxes** represent main user interface stages (Dashboard, Upload Options, Results Display).
- **Pink boxes** indicate interaction with external services (Together AI API).
- **Blue boxes** show database operations.

The flow chart captures the entire user journey, from authentication to receiving and potentially saving plant identification results.
