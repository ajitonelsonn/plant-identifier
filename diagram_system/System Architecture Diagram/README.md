# Plant Identifier Application

## System Architecture Overview

![System Architecture Diagram](/diagram_system/System%20Architecture%20Diagram/System_Architecture_Diagram.png)

### Client Side:

- **Web Browser**: The user's entry point to the application.
- **Next.js Frontend**: Handles the user interface and client-side logic.

### Server Side:

- **Next.js API Routes**: Acts as the gateway for all server-side operations.
- **Authentication Service**: Manages user authentication and authorization.
- **Image Processing Service**: Prepares uploaded images for identification.
- **Plant Identification Service**: Interfaces with Together AI for plant recognition.
- **Care Tips Generation Service**: Generates care advice for identified plants.
- **User Profile Service**: Manages user profile information.
- **Plant Collection Service**: Handles saving and retrieving user's plant identifications.

### Database:

- **PostgreSQL Database**: Stores all persistent data, including user information, plant identifications, and collections.

### External Services:

- **Together AI API**: Used for plant identification and care tips generation.
- **Email Service**: Handles sending verification emails and notifications.

---

## Key Interactions:

- The **Next.js Frontend** communicates with the server through **API Routes**.
- **API Routes** distribute requests to appropriate services on the server side.
- The **Authentication**, **User Profile**, and **Plant Collection services** interact with the **PostgreSQL database**.
- The **Plant Identification** and **Care Tips Generation services** make API calls to the **Together AI API**.
- The **Image Processing Service** prepares images before sending them to the **Plant Identification Service**.
- The **Authentication Service** can trigger emails through the **Email Service**.

---

## Color Coding (System Diagram Reference):

- **Green**: Client-side components
- **Pink**: Server-side components
- **Blue**: Database
- **Yellow**: External services

---

## Benefits of this Architecture:

1. **Separation of Concerns**: Each component has a specific responsibility.
2. **Scalability**: Components can be scaled independently as needed.
3. **Maintainability**: Modular design allows for easier updates and maintenance.
4. **Security**: Authentication is centralized, and database access is controlled.
5. **Extensibility**: New services can be added without major restructuring.

---
