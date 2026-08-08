import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { envValidationSchema } from './config/configration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisCacheModule } from './shared/cache/redis-cache.module';
import { BullModule } from '@nestjs/bullmq';
import { ThrottlerModule } from '@nestjs/throttler';
import { EducationalStructureModule } from './educational-structure/educational-structure.module';
import { LessonsModule } from './educational-structure/lessons/lessons.module';
import { ProfileModule } from './profile/profile.module';
import { ChatroomModule } from './chat/chatroom/chatroom.module';
import { ChatmessagesModule } from './chat/chatmessages/chatmessages.module';
import { ChatModule } from './chat/chat.module';
import { CloudinaryProvider, CloudinaryService } from './shared/cloudinary';

@Module({
  imports: [
    RedisCacheModule,
    UsersModule,
    AuthModule,
    EducationalStructureModule,
    LessonsModule,
    ChatModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: envValidationSchema,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.getOrThrow<string>('redis.host'),
          port: configService.getOrThrow<number>('redis.port'),
        },
      }),
    }),

    ProfileModule,

    ChatroomModule,

    ChatmessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class AppModule {}
