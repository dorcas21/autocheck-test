import { HttpService } from "@nestjs/axios";
import { Observable } from "rxjs";
export declare class RecentStoriesService {
    private httpService;
    private topStoryIDs$;
    private topStory$;
    private result$;
    private storyTitles;
    private firstTenWords;
    private story;
    constructor(httpService: HttpService);
    getTopStories(count: any): Promise<any[] | {
        statusCode: number;
        statusDescription: string;
        data: any;
    }>;
    getLastWeekStories(days: any): Promise<any[] | {
        statusCode: number;
        statusDescription: string;
        data: any;
    }>;
    getStoriesByKarma(karma: any): any;
    computeKarmaBasedStories(results: any, karma: any): any;
    computeWords(count: any): any[] | {
        statusCode: number;
        statusDescription: string;
        data: any;
    };
    computeTopStories(results: any, count: any): Promise<any[] | {
        statusCode: number;
        statusDescription: string;
        data: any;
    }>;
    computeWordsInLastWeekStories(results: any, days: any): Promise<any[] | {
        statusCode: number;
        statusDescription: string;
        data: any;
    }>;
    getHackerNewsTopStories(): Observable<Object>;
    populateStoriesMap(response: any, count: any): any[] | {
        statusCode: number;
        statusDescription: string;
        data: any;
    };
    populateThisWeekStoriesMap(response: any, days: any): any[] | {
        statusCode: number;
        statusDescription: string;
        data: any;
    };
    getHackerNewsSingleStory(storyID: any): Promise<Observable<Object>>;
}
