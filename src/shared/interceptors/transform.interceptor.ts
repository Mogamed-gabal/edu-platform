/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T | null>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T | null>> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data: T): Response<T | null> => ({
        success: true,
        statusCode,
        message: 'Request processed successfully',
        data: data ?? null,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
