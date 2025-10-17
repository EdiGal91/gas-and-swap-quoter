jest.mock('src/cache/cache.manager', () => ({
  CacheManager: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    getJson: jest.fn(),
    setJson: jest.fn(),
  })),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { GasController } from './gas.controller';
import { GasService } from './gas.service';

describe('GasController', () => {
  let controller: GasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GasController],
      providers: [
        {
          provide: GasService,
          useValue: {
            getGasPrice: jest.fn().mockResolvedValue({
              gasPrice: '1',
              maxFeePerGas: '1',
              maxPriorityFeePerGas: '1',
              unit: 'gwei',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<GasController>(GasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
