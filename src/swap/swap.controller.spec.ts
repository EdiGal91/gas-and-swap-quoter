import { Test, TestingModule } from '@nestjs/testing';
import { SwapController } from './swap.controller';
import { SwapService } from './swap.service';

describe('SwapController', () => {
  let controller: SwapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwapController],
      providers: [
        {
          provide: SwapService,
          useValue: {
            getSwapResult: jest.fn().mockResolvedValue({
              fromToken: '0x0',
              toToken: '0x0',
              amountIn: '0',
              amountOut: '0',
              route: [],
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<SwapController>(SwapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
