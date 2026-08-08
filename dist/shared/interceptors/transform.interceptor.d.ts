import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T | null;
    timestamp: string;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, Response<T | null>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T | null>>;
}
