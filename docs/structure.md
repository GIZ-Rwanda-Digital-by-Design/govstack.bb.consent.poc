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
- **Consent Application**:
  - Consent BB application interface for host institution from where an individual can give consent for all agreements configured by host institution in Consent BB Organization Dashboard.
- **Dashboard Application**:
  - Consent BB application interface for host institution to define agreements.
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