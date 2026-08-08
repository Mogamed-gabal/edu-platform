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
import { AppModule } from '../../src/app.module';
import { CloudinaryService } from '../../src/shared/cloudinary/cloudinary.service';

describe('LessonsController (E2E Integration)', () => {
  let app: INestApplication;

  const mockCloudinaryService = {
    uploadImage: jest.fn().mockResolvedValue({
      secure_url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      public_id: 'sample_id',
    }),
    uploadVideo: jest.fn().mockResolvedValue({
      secure_url: 'https://res.cloudinary.com/demo/video/upload/sample.mp4',
      public_id: 'sample_video_id',
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CloudinaryService)
      .useValue(mockCloudinaryService)
      .compile();

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

  describe('GET /lessons/chapter/:chapterId', () => {
    it('should return 200 and a list of lessons for a chapter', async () => {
      const chapterId = '123e4567-e89b-12d3-a456-426614174000';

      const server = app.getHttpServer() as unknown as Parameters<
        typeof request
      >[0];
      const response = await request(server)
        .get(`/lessons/chapter/${chapterId}`)
        .expect(HttpStatus.OK);

      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('GET /lessons/:id', () => {
    it('should return 404 when lesson is not found', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      const server = app.getHttpServer() as unknown as Parameters<
        typeof request
      >[0];
      await request(server)
        .get(`/lessons/${nonExistentId}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
