import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakService } from './keycloak.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KeycloakService],
})
export class AppModule {}
