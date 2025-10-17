import { Test, TestingModule } from '@nestjs/testing';
import { SwapService } from './swap.service';
import { UniswapService } from './uniswap.service';

describe('SwapService', () => {
  let service: SwapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwapService,
        {
          provide: UniswapService,
          useValue: {
            getPairAddress: jest
              .fn()
              .mockResolvedValue('0x0000000000000000000000000000000000000001'),
            getPairInfo: jest.fn().mockResolvedValue({
              token0: '0x0000000000000000000000000000000000000001',
              reserve0: 1000n,
              token1: '0x0000000000000000000000000000000000000002',
              reserve1: 1000n,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SwapService>(SwapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
