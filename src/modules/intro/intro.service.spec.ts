import { Test, TestingModule } from '@nestjs/testing';
import { IntroService } from './intro.service';

describe('IntroService', () => {
  let service: IntroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntroService],
    }).compile();

    service = module.get<IntroService>(IntroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
