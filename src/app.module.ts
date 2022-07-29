import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecentStoriesModule } from './recent-stories/recent-stories.module';

@Module({
  imports: [RecentStoriesModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
