import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { JsonRpcProvider } from 'ethers';

describe('GasController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    jest.spyOn(JsonRpcProvider.prototype, 'getFeeData').mockResolvedValue({
      gasPrice: BigInt(1_000_000_000),
      maxFeePerGas: BigInt(2_000_000_000),
      maxPriorityFeePerGas: BigInt(3_000_000_000),
    } as any);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.URI,
      prefix: 'v',
      defaultVersion: '1',
    });
    await app.init();
  });

  it('/api/v1/gasPrice (GET)', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/gasPrice')
      .expect(200)
      .expect({
        gasPrice: '1.0',
        maxFeePerGas: '2.0',
        maxPriorityFeePerGas: '3.0',
        unit: 'gwei',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
