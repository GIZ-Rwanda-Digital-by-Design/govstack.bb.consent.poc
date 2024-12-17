## Detailed POC Flow Description

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
   - **Step 11**: The admin logs in using **admin@example.com**.
   - **Step 12**: Once logged in, the admin can see a list of all attendees, along with their details and the consent status for each individual agreement.