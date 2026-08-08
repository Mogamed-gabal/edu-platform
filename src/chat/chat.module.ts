import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatroomModule } from './chatroom/chatroom.module';
import { ChatmessagesModule } from './chatmessages/chatmessages.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    ChatroomModule,
    ChatmessagesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret =
          configService.get<string>('jwt.accessSecret') ??
          configService.get<string>('JWT_ACCESS_SECRET');
        const expiresIn =
          configService.get<string>('jwt.accessExpiration') ??
          configService.get<string>('JWT_ACCESS_EXPIRATION') ??
          '15m';

        return {
          secret,
          signOptions: {
            expiresIn: expiresIn as never,
          },
        };
      },
    }),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
