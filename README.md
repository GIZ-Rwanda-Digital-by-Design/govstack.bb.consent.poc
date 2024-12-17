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

## Detailed POC Flow Description
   [View Detailed POC Flow Description](docs/setup.md)

## Repository Structure
   [View Repository Structure](docs/structure.md)

## Docker Compose Services
   [View Docker Compose Services](docs/docker.md)

## Setup and Deployment
   [View Setup and Deployment](docs/setup.md)

## Technologies Used
- **GO**
- **Shell** 
- **TypeScript** 
- **JavaScript**
- **ReactJS**
- **Dockerfile**
