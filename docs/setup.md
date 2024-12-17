# Setting up the project

### 1. Clone repository
```
    git clone git@github.com:merceaemil/consent-bb.git
```

### 2. Setup the following virtual hosts in Windows hosts file if using WSL.
```
    127.0.0.1 bb-consent.local
    127.0.0.1 api.bb-consent.local
    127.0.0.1 dashboard.bb-consent.local
    127.0.0.1 privacy.bb-consent.local
    127.0.0.1 auth.bb-consent.local
    127.0.0.1 userapi.bb-consent.local
    127.0.0.1 userapp.bb-consent.local
    127.0.0.1 nidaapi.bb-consent.local
    127.0.0.1 keycloak
```

### 2. Navigate to Consent BB - API and build api the project
```
   cd **<repo_directory>**/consent-bb/api
   make build/docker/builder
   make build/docker/deployable
```

### 3. Deploy all applications using Docker Compose
```
   cd <repo_directory>
   docker-compose up
```

### 4. Setup organization developer key

   1. Go to http://dashboard.bb-consent.local
   2. Login with username *admin@host.com* and password test1234
   3. Navigate to Account/Developer APIs  and click on the + icon to create a developer api key. Select All Scopes.
   4. Copy the api key by clicking the COPY button from the tooltip message
   5. Paste the key value in **<repo_directory>**/.env for variable **CONSENT_BB_DEVELOPER_APIKEY**

### 5. Create at least one agreement to allow sync data from NIDA
   1. Go to http://dashboard.bb-consent.local
   2. Login with username **admin@host.com** and password **test1234**
   3. Go to Data Agreements and click on the + sign to create agreement
   4. Save and PUBLISH the agreement
   5. View the newly created agreement by clicking on the eye icon and copy the agreement id from the blue header.
   6. Paste the agreement id in **<repo_directory>**/.env for variable **NIDA_AGREEMENT_THAT_SHOULD_BE_OPTIN**

### 6. Create NIDA realm and mock some users
```
   cd <repo_directory>/nida/resources/mock-users
   chmod 777 import-users.sh
   ./import-users.sh --import users.csv
```

### 7. Recreate containers to apply new env variables.
   1. ctrl+c to stop the running containers
   2. docker-compose up



## Available accounts

#### 1. http://dashboard.bb-consent.local
```
   user: admin@host.com
   pass: test1234
```

### 2. http://privacy.bb-consent.local
```
   Use Login with NationalID
   users: nid001,nid002......nid057
   password for all users: test1234
```

### 3. http://userapp.bb-consent.local
```
   user: admin@example.com
   pass: secret
```

### 4. http://auth.bb-consent.local (Keycloack admin)
```
   user: admin
   pass: admin
```
