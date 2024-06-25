import { Test, TestingModule } from '@nestjs/testing';
import { PrintBoundedContextsService } from './print-bounded-contexts.service';

describe('PrintBoundedContextsService', () => {
  let service: PrintBoundedContextsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrintBoundedContextsService],
    }).compile();

    service = module.get<PrintBoundedContextsService>(PrintBoundedContextsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
