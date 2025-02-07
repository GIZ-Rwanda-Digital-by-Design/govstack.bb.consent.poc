db = db.getSiblingDB("bb-consent-consentdb");

db.createUser({
  user: "bb-consent-user",
  pwd: "bb-consent-password",
  roles: [{ role: "readWrite", db: "bb-consent-consentdb" }],
  mechanisms: ["SCRAM-SHA-1"]
});