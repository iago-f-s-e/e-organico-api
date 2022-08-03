import axios, { AxiosError } from 'axios';
import * as Settings from '@src/server/settings';
import * as Nest from '@nestjs/common';

type AppError = {
  message: string;
  error: string;
  statusCode: number;
};

function transporterErrorInstance(error?: AppError) {
  switch (error?.statusCode) {
    case Nest.HttpStatus.BAD_REQUEST:
      throw new Nest.BadRequestException(error.message);

    case Nest.HttpStatus.NOT_FOUND:
      throw new Nest.NotFoundException(error.message);

    case Nest.HttpStatus.REQUEST_TIMEOUT:
      throw new Nest.RequestTimeoutException(error.message);

    case Nest.HttpStatus.CONFLICT:
      throw new Nest.ConflictException(error.message);

    case Nest.HttpStatus.BAD_GATEWAY:
      throw new Nest.BadGatewayException(error.message);

    case Nest.HttpStatus.FORBIDDEN:
      throw new Nest.ForbiddenException(error.message);

    case Nest.HttpStatus.GATEWAY_TIMEOUT:
      throw new Nest.GatewayTimeoutException(error.message);

    case Nest.HttpStatus.METHOD_NOT_ALLOWED:
      throw new Nest.MethodNotAllowedException(error.message);

    case Nest.HttpStatus.NOT_ACCEPTABLE:
      throw new Nest.NotAcceptableException(error.message);

    case Nest.HttpStatus.PAYLOAD_TOO_LARGE:
      throw new Nest.PayloadTooLargeException(error.message);

    case Nest.HttpStatus.UNAUTHORIZED:
      throw new Nest.UnauthorizedException(error.message);

    default:
      throw new Nest.InternalServerErrorException(error?.message);
  }
}

function responseErrorInterceptor(error: AxiosError<AppError>) {
  return Promise.reject(transporterErrorInstance(error.response?.data));
}

const httpClient = axios.create({
  baseURL: Settings.EXTERNAL_SERVICES,
  timeout: Settings.EXTERNAL_TIMEOUT
});

httpClient.interceptors.response.use(response => response, responseErrorInterceptor);

export { httpClient };
