import { Test, TestingModule } from '@nestjs/testing';
import { RecentStoriesController } from './recent-stories.controller';

describe('RecentStoriesController', () => {
  let controller: RecentStoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecentStoriesController],
    }).compile();

    controller = module.get<RecentStoriesController>(RecentStoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
