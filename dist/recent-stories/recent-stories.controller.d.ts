import { RecentStoriesService } from './recent-stories.service';
export declare class RecentStoriesController {
    private recentStoriesService;
    constructor(recentStoriesService: RecentStoriesService);
    getTopStories(count: any): Promise<any[] | {
        statusCode: number;
        statusDescription: string;
        data: any;
    }>;
    getThisWeekStories(days: any): Promise<any[] | {
        statusCode: number;
        statusDescription: string;
        data: any;
    }>;
    getStoriesBasedOnKarma(karma: any): any;
}
