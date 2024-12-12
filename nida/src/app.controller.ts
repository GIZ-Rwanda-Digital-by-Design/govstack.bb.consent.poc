import { BadRequestException, Controller, Get, HttpException, Param } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly appService: AppService,
  ) {}

  @Get('user/:individualId')
  async getUserByNid(
    @Param('individualId') individualId: string
  ) {
    const isConsentGiven = await this.appService.isConsentGiven(individualId);

    if (!isConsentGiven){
      throw new BadRequestException('Consent not provided for this institution');
    }

    const individual =
        await this.appService.getConsentIndividual(individualId);

    if (!individual || !individual.externalId) {
      throw new BadRequestException('Individual not found');
    }

    const nidaUser = await this.keycloakService.getUserById(
      individual.externalId,
    );

    if (!nidaUser) {
      throw new BadRequestException('User not found');
    }

    return {
      firstName: nidaUser.firstName,
      lastName: nidaUser.lastName,
      email: nidaUser.email,
      username: nidaUser.username,
      organization: nidaUser.attributes?.organization?.[0],
      nid: nidaUser.attributes?.nid?.[0],
      designation: nidaUser.attributes?.designation?.[0],
    };
  }
}
