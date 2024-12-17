# Setting up the project

### 1. Clone repository
```
    git clone git@github.com:merceaemil/consent-bb.git
```

### 2. Go into consent-bb/api and make the build
```

```
### 3. Mock NIDA users into keycloak instance
```
    cd nida/resources/mock-users
    ./import-users.sh --import users.csv
```
### 4. Setup the following virtual hosts in Windows hosts file if using WSL.
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