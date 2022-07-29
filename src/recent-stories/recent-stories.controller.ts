import { Controller, Get, Param, Post } from '@nestjs/common';
import { count } from 'console';
import { RecentStoriesService } from './recent-stories.service';

@Controller('recent-stories')
export class RecentStoriesController {
constructor(private recentStoriesService:RecentStoriesService){}

        @Get('top-stories/:count')
        getTopStories(@Param('count') count)  {
            return this.recentStoriesService.getTopStories(count); 

        }

        @Get('stories-by-time/:days')
        getThisWeekStories(@Param('days') days){

        return this.recentStoriesService.getLastWeekStories(days);

        }

        @Get('stories-by-karma/:karma')
        getStoriesBasedOnKarma(@Param('karma') karma){
            return this.recentStoriesService.getStoriesByKarma(karma);
        }
}
