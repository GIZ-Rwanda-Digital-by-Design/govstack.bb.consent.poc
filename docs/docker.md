## Docker Compose Services

### 1. **Gateway Service**
   - **Description**: A reverse proxy (using Traefik) that manages routing between various services.
   - **URL**: [http://bb-consent.local](http://bb-consent.local) (for the dashboard), [http://auth.bb-consent.local](http://auth.bb-consent.local) (for Keycloak)
   - **Usage**: Routes traffic to various internal services like Keycloak, Consent BB API, and Admin Dashboard.

### 2. **MongoDB**
   - **Description**: MongoDB instance for storing consent-related data.
   - **URL**: N/A (used internally)
   - **Usage**: Stores and manages consent data.

### 3. **PostgreSQL**
   - **Description**: PostgreSQL database for managing Keycloak data.
   - **URL**: N/A (used internally)
   - **Usage**: Stores and manages Keycloak user and authentication data.

### 4. **Keycloak**
   - **Description**: Identity and access management service for secure user authentication.
   - **URL**: [http://auth.bb-consent.local](http://auth.bb-consent.local)
   - **Usage**: Manages user authentication and authorization for Consent BB applications.

### 5. **Consent BB API**
   - **Description**: Core API service for managing consent-related workflows and interactions.
   - **URL**: [http://api.bb-consent.local](http://api.bb-consent.local)
   - **Usage**: Handles consent workflows and data validation logic.

### 6. **Consent BB Admin Dashboard**
   - **Description**: Admin interface for managing and viewing consent data.
   - **URL**: [http://dashboard.bb-consent.local](http://dashboard.bb-consent.local)
   - **Usage**: Admins use it to manage the overall Consent BB system and view reports.

### 7. **Consent BB User Consent Agreement Screen**
   - **Description**: User interface for showing and managing user consent agreements.
   - **URL**: [http://privacy.bb-consent.local](http://privacy.bb-consent.local)
   - **Usage**: Allows users to consent to data sharing agreements.

### 8. **Client Email Service (Maildev)**
   - **Description**: Development tool for simulating email services during testing.
   - **URL**: [http://localhost:1080](http://localhost:1080)
   - **Usage**: View and debug emails sent by the system.

### 9. **Client DB Admin Manager (Adminer)**
   - **Description**: Database management tool for PostgreSQL and MongoDB databases.
   - **URL**: [http://pgadmin.bb-consent.local](http://pgadmin.bb-consent.local)
   - **Usage**: Administer and manage databases.

### 10. **Client API (User API)**
   - **Description**: API service for managing client-side user interactions and consent data.
   - **URL**: [http://userapi.bb-consent.local](http://userapi.bb-consent.local)
   - **Usage**: Handles client-side API requests related to user consent.

### 11. **Client Frontend (User App)**
   - **Description**: Frontend application for user interaction and consent registration.
   - **URL**: [http://userapp.bb-consent.local](http://userapp.bb-consent.local)
   - **Usage**: Provides a user interface for consent registration and interaction with the system.

### 12. **NIDA API**
   - **Description**: Simulates the NIDA API to provide attendee details based on consent validation.
   - **URL**: [http://nida.bb-consent.local](http://nida.bb-consent.local)
   - **Usage**: Handles external data validation for consent workflows using NIDA.