import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { containerActions } from '@src/infra/container/helpers';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ContainerInterceptor implements NestInterceptor {
  private async handleBeforeCall(): Promise<void> {
    await containerActions().called();
  }

  private async handleAfterCall(): Promise<void> {
    await containerActions().free();
  }

  public async intercept(_: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> { //eslint-disable-line 
    await this.handleBeforeCall();

    return next.handle().pipe(
      tap(async () => {
        await this.handleAfterCall();
      })
    );
  }
}
