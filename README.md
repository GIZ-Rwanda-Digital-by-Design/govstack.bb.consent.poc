# Consent BB Proof of Concept (POC)

This repository contains a Proof of Concept (POC) implementation for testing two consent-based scenarios using the Consent BB system. The scenarios focus on data sharing and validation processes involving attendees, employer institutions, and host organizations. These tests ensure trustworthy, compliant, and efficient data sharing.

## Purpose

The POC aims to:
- Test consent-based data validation workflows.
- Ensure compliance with data protection policies (DPP).
- Improve data reliability for attendance-based payments.

## Scenarios

### Scenario A: Attendee Registration and Consent
#### Actors:
- **Attendees**
- **Employer Institution(s)**
- **Host Institution**
- **NID (Rwanda National ID)**

#### Workflow:
1. Attendees scan a QR code.
2. They input personal details (NID Number, Name, Institution, Designation, Mobile Number).
3. A consent screen is displayed for data validation against NID.
4. Upon consent, the data is validated and shared with the Host Institution.

#### Systems Involved:
- Consent BB for NID.
- Host Organization and Employer Institution(s) (e.g., RISA).

#### Benefit:
- Payments are based on real attendance.
- Trustworthy and compliant data sharing.

### Scenario B: Claim Verification
#### Actors:
- **Employer Institution(s)**
- **Host Institution**

#### Workflow:
1. The accounting application displays a list of claims.
2. Admins can verify participation claims.
3. Verification results:
   - Green tick: Indicates the individual attended and consented to data sharing.
   - Red cross: Indicates absence or lack of consent.

#### Systems Involved:
- Consent BB.
- Host Organization and Employer Institution(s) (e.g., RISA).

#### Benefit:
- Payments are made based on verified attendance.
- Ensures trustworthy data sharing.

## Repository Structure

### `client-apps/`
- **Registration App**: 
  - http://userapp.bb-consent.local/
  - Implements the attendee registration workflow as described in Scenario A.
  - Provides a user interface for attendees to scan QR codes, input personal data, and give consent.

- **Verification App**:
  - http://userapp.bb-consent.local/admin
  - admin@admin.com / nid001
  - Focuses on the claim verification process in Scenario B.
  - Used by accounting administrators to verify attendance claims and consent statuses.

### `consent-bb/`
- **API Services**:
  - RESTful APIs to handle consent management, and data validation workflows.
- **Database Models**:
  - Defines the schema for storing consent records, and verification statuses.
- **Validation Modules**:
  - Interfaces with external systems like NID for data validation.
- **Business Logic**:
  - Core logic for managing scenarios, ensuring compliance, and orchestrating system interactions.
- **Configuration Files**:
  - Environment-specific settings for database connections, API endpoints, and logging.

### `nida/`
- **API Services**:
  - Simulate NIDA RESTful APIs to provide attendee details based on  consent validation.
  - Connects to consent-bb keycloack instance, nida users are recorded in a separate realm called NIDA.

### `docker-compose.yaml`
- Defines the services and dependencies required to run the Consent BB system.
- Includes configurations for database services, application servers, and networking.

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

## Technologies Used
- **GO**
- **Shell** 
- **TypeScript** 
- **JavaScript**
- **ReactJS**
- **Dockerfile**

## Setup and Deployment

1. Clone the repository:
   ```bash
   git clone https://github.com/merceaemil/consent-bb.git
   ```
2. Navigate to the project directory:
   ```bash
   cd consent-bb
   ```
3. Deploy the application using Docker Compose:
   ```bash
   docker-compose up
   ```

## Flow Description

#### 1. **Attendee Process**
   - **Step 1**: The attendee visits the **User Frontend** at [http://userapp.bb-consent.local](http://userapp.bb-consent.local).
   - **Step 2**: Upon clicking "Proceed," the attendee is redirected to the **Consent Form** at `/form` where they are asked to input their **National ID (NID)**.
   - **Step 3**: A new user is registered in the **Client API** located at [http://userapi.bb-consent.local](http://userapi.bb-consent.local).
   - **Step 4**: The user is then redirected to the **Consent Screen**.
   - **Step 5**: After clicking "Proceed" on the consent screen, the attendee is taken to the **Consent Agreement** page at [http://privacy.bb-consent.local](http://privacy.bb-consent.local).
     - Here, the attendee logs in using their **National ID**.
   - **Step 6**: The attendee gives consent for two data-sharing agreements.
     - When the attendee selects a checkbox for an agreement, the **Consent BB API** (located at [http://api.bb-consent.local](http://api.bb-consent.local)) triggers a webhook to the **Client API**.
   
#### 2. **Consent Update Process**
   - **Step 7**: The **Client API** (at [http://userapi.bb-consent.local](http://userapi.bb-consent.local)) receives the webhook and updates the user's consent status.
   - **Step 8**: The **Client API** makes a request to the **NIDA API** at [http://nida.bb-consent.local](http://nida.bb-consent.local) to retrieve the attendee’s details based on their **Consent BB user ID**.
     - If the attendee has consented to allow NIDA to share their data with the host institution (the **Client App**), the **NIDA API** provides the user’s details.
   - **Step 9**: The **Client API** stores both the user details and the consent status in its database.

#### 3. **Employer/Institution Process**
   - **Step 10**: The employer (or institution admin) navigates to [http://userapp.bb-consent.local/admin](http://userapp.bb-consent.local/admin).
   - **Step 11**: The admin logs in using **admin@admin.com**.
   - **Step 12**: Once logged in, the admin can see a list of all attendees, along with their details and the consent status for each individual agreement.