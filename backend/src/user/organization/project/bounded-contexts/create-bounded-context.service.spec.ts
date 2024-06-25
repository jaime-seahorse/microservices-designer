import { Test, TestingModule } from '@nestjs/testing';
import { CreateBoundedContextService } from './create-bounded-context.service';

describe('CreateBoundedContextService', () => {
  let service: CreateBoundedContextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBoundedContextService],
    }).compile();

    service = module.get<CreateBoundedContextService>(CreateBoundedContextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
