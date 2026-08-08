import { webcrypto } from 'node:crypto';

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    writable: true,
    configurable: true,
  });
}

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (E2E Integration)', () => {
  let app: INestApplication;

  const testUser = {
    fullName: 'Test Integration User',
    email: 'integration.user@example.com',
    password: 'StrongPassword123!',
    phoneNumber: '+201000000000',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('POST /auth/register', () => {
    it('should fail with HTTP 400 when payload is invalid', async () => {
      const invalidPayload = {
        fullName: '',
        email: 'invalid-email',
        password: '123',
      };

      const server = app.getHttpServer() as unknown as Parameters<
        typeof request
      >[0];
      const response = await request(server)
        .post('/auth/register')
        .send(invalidPayload)
        .expect(HttpStatus.BAD_REQUEST);

      const body = response.body as Record<string, unknown>;
      expect(body.message).toBeDefined();
    });

    it('should successfully register a user and return HTTP 201', async () => {
      const server = app.getHttpServer() as unknown as Parameters<
        typeof request
      >[0];
      const response = await request(server)
        .post('/auth/register')
        .send(testUser)
        .expect(HttpStatus.CREATED);

      const body = response.body as Record<string, unknown>;
      expect(body).toHaveProperty('userId');
      expect(body).toHaveProperty('message');
    });
  });

  describe('POST /auth/login', () => {
    it('should fail with HTTP 401 on wrong password', async () => {
      const server = app.getHttpServer() as unknown as Parameters<
        typeof request
      >[0];
      await request(server)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword123!',
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should successfully login and return access and refresh tokens', async () => {
      const server = app.getHttpServer() as unknown as Parameters<
        typeof request
      >[0];
      const response = await request(server)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(HttpStatus.OK);

      const body = response.body as Record<string, unknown>;
      expect(body).toHaveProperty('accessToken');
      expect(body).toHaveProperty('refreshToken');
    });
  });

  describe('POST /auth/forgot-password', () => {
    it('should trigger forgot password flow and send OTP', async () => {
      const server = app.getHttpServer() as unknown as Parameters<
        typeof request
      >[0];
      const response = await request(server)
        .post('/auth/forgot-password')
        .send({ email: testUser.email })
        .expect(HttpStatus.OK);

      const body = response.body as Record<string, unknown>;
      expect(body).toHaveProperty('message');
    });
  });
});
