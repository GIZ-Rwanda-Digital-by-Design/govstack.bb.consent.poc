package webhook

import (
	"context"

	"github.com/bb-consent/api/internal/common"
	"github.com/bb-consent/api/internal/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Webhook Defines the structure for an organisation webhook
type Webhook struct {
	ID                  string   `json:"id" bson:"_id,omitempty"`           // Webhook ID
	OrganisationId      string   `json:"orgId" bson:"orgid"`                // Organisation ID
	PayloadURL          string   `json:"payloadUrl" valid:"required"`       // Webhook payload URL
	ContentType         string   `json:"contentType" valid:"required"`      // Webhook payload content type for e.g application/json
	SubscribedEvents    []string `json:"subscribedEvents" valid:"required"` // Events subscribed for e.g. user.data.delete
	Disabled            bool     `json:"disabled"`                          // Disabled or not
	SecretKey           string   `json:"secretKey" valid:"required"`        // For calculating SHA256 HMAC to verify data integrity and authenticity
	SkipSSLVerification bool     `json:"skipSslVerification"`               // Skip SSL certificate verification or not (expiry is checked)
	TimeStamp           string   `json:"timestamp"`                         // UTC timestamp
	IsDeleted           bool     `json:"-"`
}

// WebhookDelivery Details of payload delivery to webhook endpoint
type WebhookDelivery struct {
	ID                      string              `bson:"_id,omitempty"` // Webhook delivery ID
	WebhookID               string              // Webhook ID
	UserID                  string              // ID of user who triggered the webhook event
	WebhookEventType        string              // Webhook event type for e.g. data.delete.initiated
	RequestHeaders          map[string][]string // HTTP headers posted to webhook endpoint
	RequestPayload          interface{}         // JSON payload posted to webhook endpoint
	ResponseHeaders         map[string][]string // HTTP response headers received from webhook endpoint
	ResponseBody            string              // HTTP response body received from webhook endpoint in bytes
	ResponseStatusCode      int                 // HTTP response status code
	ResponseStatusStr       string              // HTTP response status string
	ExecutionStartTimeStamp string              // UTC timestamp when webhook execution started
	ExecutionEndTimeStamp   string              // UTC timestamp when webhook execution ended
	Status                  string              // Status of webhook delivery for e.g. failed or completed
	StatusDescription       string              // Describe the status for e.g. Reason for failure
}

func WebhookCollection() *mongo.Collection {
	return database.DB.Client.Database(database.DB.Name).Collection("webhooks")
}

func WebhookDeliveryCollection() *mongo.Collection {
	return database.DB.Client.Database(database.DB.Name).Collection("webhookDeliveries")
}

// CreateWebhook Adds a webhook for an organisation
func CreateWebhook(webhook Webhook) (Webhook, error) {

	_, err := WebhookCollection().InsertOne(context.TODO(), &webhook)
	if err != nil {
		return webhook, err
	}
	return webhook, nil
}

// GetByOrgID Gets a webhook by organisation ID and webhook ID
func GetByOrgID(webhookId, orgID string) (result Webhook, err error) {

	err = WebhookCollection().FindOne(context.TODO(), bson.M{"_id": webhookId, "orgid": orgID}).Decode(&result)

	return result, err
}

// DeleteWebhook Deletes a webhook for an organisation
func DeleteWebhook(webhookId string) error {

	filter := bson.M{"_id": webhookId}

	_, err := WebhookCollection().DeleteOne(context.TODO(), filter)
	if err != nil {
		return err
	}

	return nil
}

// UpdateWebhook Updates a webhook for an organization
func UpdateWebhook(webhook Webhook) (Webhook, error) {

	filter := bson.M{"_id": webhook.ID}
	update := bson.M{"$set": webhook}

	_, err := WebhookCollection().UpdateOne(context.TODO(), filter, update)
	return webhook, err
}

// GetActiveWebhooksByOrgID Gets all active webhooks for a particular organisation
func GetActiveWebhooksByOrgID(orgID string) (results []Webhook, err error) {
	filter := bson.M{"orgid": orgID, "disabled": false, "isdeleted": false}

	cursor, err := WebhookCollection().Find(context.TODO(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	if err := cursor.All(context.TODO(), &results); err != nil {
		return nil, err
	}

	return results, err
}

// GetWebhookCountByPayloadURL Gets the count of webhooks with same payload URL for an organisation
func GetWebhookCountByPayloadURL(orgID string, payloadURL string) (count int64, err error) {

	count, err = WebhookCollection().CountDocuments(context.TODO(), bson.M{"orgid": orgID, "payloadurl": payloadURL})

	return count, err
}

// GetAllWebhooksByOrgID Gets all webhooks for a given organisation
func GetAllWebhooksByOrgID(orgID string) (results []Webhook, err error) {
	filter := bson.M{"orgid": orgID}

	options := options.Find().SetSort(bson.D{{Key: "timestamp", Value: -1}})

	cursor, err := WebhookCollection().Find(context.TODO(), filter, options)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	if err := cursor.All(context.TODO(), &results); err != nil {
		return nil, err
	}

	return results, nil
}

// GetLastWebhookDelivery Gets the last delivery for a webhook
func GetLastWebhookDelivery(webhookID string) (result WebhookDelivery, err error) {
	filter := bson.M{"webhookid": webhookID}

	options := options.FindOne().SetSort(bson.D{{Key: "executionstarttimestamp", Value: -1}})

	err = WebhookDeliveryCollection().FindOne(context.TODO(), filter, options).Decode(&result)
	if err != nil {
		return WebhookDelivery{}, err
	}

	return result, nil
}

// GetWebhookByPayloadURL Get the webhook for an organisation by payload URL
func GetWebhookByPayloadURL(orgID string, payloadURL string) (result Webhook, err error) {

	err = WebhookCollection().FindOne(context.TODO(), bson.M{"orgid": orgID, "payloadurl": payloadURL}).Decode(&result)

	return result, err
}

// GetWebhookDeliveryByID Gets payload delivery details by ID
func GetWebhookDeliveryByID(webhookID string, webhookDeliveryId string) (result WebhookDelivery, err error) {

	err = WebhookDeliveryCollection().FindOne(context.TODO(), bson.M{"webhookid": webhookID, "_id": webhookDeliveryId}).Decode(&result)

	return result, err
}

// GetAllDeliveryByWebhookIdV2 Gets all webhook deliveries for a webhook
func GetAllDeliveryByWebhookId(webhookId string) (results []WebhookDelivery, err error) {
	filter := bson.M{"webhookid": webhookId}

	options := options.Find()
	options.SetSort(bson.D{{Key: "executionstarttimestamp", Value: -1}})

	cursor, err := WebhookDeliveryCollection().Find(context.TODO(), filter, options)
	if err != nil {
		return results, err
	}
	defer cursor.Close(context.TODO())

	if err := cursor.All(context.TODO(), &results); err != nil {
		return results, err
	}

	return results, nil
}

type WebhookRepository struct {
	DefaultFilter bson.M
}

// Init
func (whRepo *WebhookRepository) Init(organisationId string) {
	whRepo.DefaultFilter = bson.M{"orgid": organisationId, "isdeleted": false}
}

// CreateWebhook Adds a webhook for an organisation
func (whRepo *WebhookRepository) CreateWebhook(webhook Webhook) (Webhook, error) {

	_, err := WebhookCollection().InsertOne(context.TODO(), &webhook)
	if err != nil {
		return webhook, err
	}
	return webhook, nil
}

// GetWebhookCountByPayloadURL Gets the count of webhooks with same payload URL for an organisation
func (whRepo *WebhookRepository) GetWebhookCountByPayloadURL(payloadURL string) (count int64, err error) {
	filter := common.CombineFilters(whRepo.DefaultFilter, bson.M{"payloadurl": payloadURL})

	count, err = WebhookCollection().CountDocuments(context.TODO(), filter)

	return count, err
}

// GetByOrgID Gets a webhook by organisation ID and webhook ID
func (whRepo *WebhookRepository) GetByOrgID(webhookId string) (Webhook, error) {
	var result Webhook

	filter := common.CombineFilters(whRepo.DefaultFilter, bson.M{"_id": webhookId})

	err := WebhookCollection().FindOne(context.TODO(), filter).Decode(&result)

	return result, err
}

// GetWebhookByPayloadURL Get the webhook for an organisation by payload URL
func (whRepo *WebhookRepository) GetWebhookByPayloadURL(payloadURL string) (result Webhook, err error) {
	filter := common.CombineFilters(whRepo.DefaultFilter, bson.M{"payloadurl": payloadURL})

	err = WebhookCollection().FindOne(context.TODO(), filter).Decode(&result)

	return result, err
}

// UpdateWebhook Updates a webhook for an organization
func (whRepo *WebhookRepository) UpdateWebhook(webhook Webhook) (Webhook, error) {
	filter := bson.M{"_id": webhook.ID, "orgid": webhook.OrganisationId, "isdeleted": false}
	update := bson.M{"$set": webhook}

	_, err := WebhookCollection().UpdateOne(context.TODO(), filter, update)
	return webhook, err
}

// GetAllWebhooksByOrgID Gets all webhooks for a given organisation
func (whRepo *WebhookRepository) GetAllWebhooksByOrgID() (results []Webhook, err error) {
	filter := whRepo.DefaultFilter

	options := options.Find().SetSort(bson.D{{Key: "timestamp", Value: -1}})

	cursor, err := WebhookCollection().Find(context.TODO(), filter, options)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	if err := cursor.All(context.TODO(), &results); err != nil {
		return nil, err
	}

	return results, nil
}

// GetWebhookCountByPayloadURL Gets the count of webhooks with same payload URL for an organisation
func (whRepo *WebhookRepository) GetCountByOrganisation() (count int64, err error) {
	filter := whRepo.DefaultFilter

	count, err = WebhookCollection().CountDocuments(context.TODO(), filter)

	return count, err
}
