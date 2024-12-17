import { Injectable } from '@nestjs/common';
import KcAdminClient from 'keycloak-admin';

@Injectable()
export class KeycloakAdminService {
  private kcAdminClient: KcAdminClient;

  constructor() {
    this.kcAdminClient = new KcAdminClient({
      baseUrl: 'http://keycloak:9090', // Your Keycloak server URL
      realmName: 'master', // Default realm (replace with your realm)
    });
  }

  async authenticate() {
    await this.kcAdminClient.auth({
      username: 'admin', // Admin username
      password: 'admin', // Admin password
      grantType: 'password',
      clientId: 'admin-cli',
    });
  }

  async getUsers(): Promise<any> {
    await this.authenticate();
    return this.kcAdminClient.users.find();
  }

  async getUserById(userId: string): Promise<any> {
    await this.authenticate();
    return this.kcAdminClient.users.findOne({ id: userId, realm: 'NIDA' });
  }
}
