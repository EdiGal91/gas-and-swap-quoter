import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { App } from 'supertest/types';

const WETH_USDC_PAIR_ADDRESS = '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc';
const TOKEN0_USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const TOKEN1_WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const RESERVE0_USDC = 24728126527510n;
const RESERVE1_WETH = 6392384121538249758549n;

jest.mock('ethers', () => {
  const original = jest.requireActual('ethers');

  class MockJsonRpcProvider {
    getFeeData = jest.fn().mockResolvedValue({
      gasPrice: 0n,
      maxFeePerGas: 0n,
      maxPriorityFeePerGas: 0n,
    });
  }

  const Contract = jest.fn().mockImplementation(() => {
    return {
      token0: jest.fn().mockResolvedValue(TOKEN0_USDC),
      token1: jest.fn().mockResolvedValue(TOKEN1_WETH),
      getReserves: jest.fn().mockResolvedValue({
        reserve0: RESERVE0_USDC,
        reserve1: RESERVE1_WETH,
      }),
      getPair: jest.fn().mockResolvedValue(WETH_USDC_PAIR_ADDRESS),
    };
  });

  return {
    ...original,
    JsonRpcProvider: MockJsonRpcProvider,
    Contract,
  };
});

const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const AMOUNT_IN = (1_000_000_000_000_000_000).toString(); // 1 WETH in wei

describe('SwapController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
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

  it('/return/:fromTokenAddress/:toTokenAddress/:amountIn (GET)', async () => {
    const endpoint = `/api/v1/return/${WETH_ADDRESS}/${USDC_ADDRESS}/${AMOUNT_IN}`;

    const { body } = await request(app.getHttpServer())
      .get(endpoint)
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        fromTokenAddress: WETH_ADDRESS,
        toTokenAddress: USDC_ADDRESS,
        amountIn: AMOUNT_IN,
        pairAddress: WETH_USDC_PAIR_ADDRESS,
        token0: TOKEN0_USDC,
        token1: TOKEN1_WETH,
        reserve0: RESERVE0_USDC.toString(),
        reserve1: RESERVE1_WETH.toString(),
        amountOut: expect.any(String),
      }),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
