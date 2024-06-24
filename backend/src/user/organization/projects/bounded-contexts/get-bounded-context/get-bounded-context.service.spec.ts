import { Test, TestingModule } from '@nestjs/testing';
import { GetBoundedContextService } from './get-bounded-context.service';

describe('GetBoundedContextService', () => {
  let service: GetBoundedContextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetBoundedContextService],
    }).compile();

    service = module.get<GetBoundedContextService>(GetBoundedContextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
