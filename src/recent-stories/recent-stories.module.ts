import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RecentStoriesController } from './recent-stories.controller';
import { RecentStoriesService } from './recent-stories.service';

@Module({
    imports:[HttpModule],
  controllers: [RecentStoriesController],
  providers: [RecentStoriesService]
})
export class RecentStoriesModule {}
