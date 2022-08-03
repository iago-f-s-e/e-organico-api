import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ReserveDocumentDTO, ReserveEmailDTO, ReservePhoneDTO } from '@src/domain/dtos/auth';
import { ISignUpReserveUserDocumentController } from '@src/domain/interfaces';
import { RedisService } from '@src/infra/redis/services';
import { ReserveUserDocument, ReserveUserEmail, ReserveUserPhone } from '../services';

@Controller()
export class SignUpReserveUserDocumentController implements ISignUpReserveUserDocumentController {
  constructor(
    private readonly cache: RedisService,
    private readonly reserveDocumentService: ReserveUserDocument,
    private readonly reservePhoneService: ReserveUserPhone,
    private readonly reserveEmailService: ReserveUserEmail
  ) {}

  @Post('reserve-document')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async reserverDocument(@Body() body: ReserveDocumentDTO): Promise<void> {
    const key = `@document:${body.document}`;

    const cache = await this.cache.get<ReserveDocumentDTO>(key);

    if (!cache) {
      const reserveOrError = await this.reserveDocumentService.exec(body, key);

      if (reserveOrError.isLeft()) throw reserveOrError.value;

      return;
    }

    if (cache.device !== body.device)
      throw new ConflictException('The user document already exists.');
  }

  @Post('reserve-phone')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async reservePhone(@Body() body: ReservePhoneDTO): Promise<void> {
    const key = `@phone:${body.phone}`;

    const cache = await this.cache.get<ReservePhoneDTO>(key);

    if (!cache) {
      const reserveOrError = await this.reservePhoneService.exec(body, key);

      if (reserveOrError.isLeft()) throw reserveOrError.value;

      return;
    }

    if (cache.device !== body.device) throw new ConflictException('The user phone already exists.');
  }

  @Post('reserve-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async reserveEmail(@Body() body: ReserveEmailDTO): Promise<void> {
    const key = `@email:${body.email}`;

    const cache = await this.cache.get<ReserveEmailDTO>(key);

    if (!cache) {
      const reserveOrError = await this.reserveEmailService.exec(body, key);

      if (reserveOrError.isLeft()) throw reserveOrError.value;

      return;
    }

    if (cache.device !== body.device) throw new ConflictException('The user email already exists.');
  }
}
