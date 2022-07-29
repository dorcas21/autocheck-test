"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentStoriesService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const rxjs_1 = require("rxjs");
let RecentStoriesService = class RecentStoriesService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getTopStories(count) {
        (await this.getHackerNewsTopStories()).subscribe(response => this.computeTopStories(response, count));
        return this.computeTopStories(express_1.response, count);
    }
    async getLastWeekStories(days) {
        (await this.getHackerNewsTopStories()).subscribe(response => this.computeWordsInLastWeekStories(response, days));
        return this.computeWordsInLastWeekStories(express_1.response, days);
    }
    getStoriesByKarma(karma) {
        const results = this.httpService.get(`https://hacker-news.firebaseio.com/v0/showstories.json`).pipe((0, rxjs_1.map)((response) => response.data));
        return this.computeKarmaBasedStories(results, karma);
    }
    computeKarmaBasedStories(results, karma) {
        return results;
    }
    computeWords(count) {
        if (count == null) {
            return [];
        }
        if (this.storyTitles.size == count) {
            let wordFrequencies = new Map();
            for (let [key, value] of this.storyTitles) {
                let words = value.split(" ");
                for (const word of words) {
                    if (!wordFrequencies.has(word)) {
                        wordFrequencies.set(word, 1);
                    }
                    else {
                        wordFrequencies.set(word, wordFrequencies.get(word) + 1);
                    }
                }
            }
            const mapSort2 = new Map([...wordFrequencies.entries()].sort((a, b) => b[1] - a[1]));
            let words = Array.from(mapSort2.keys());
            this.firstTenWords = words.slice(0, 10);
        }
        return {
            "statusCode": 310,
            "statusDescription": "Top Ten Occurring Words",
            "data": this.firstTenWords
        };
    }
    async computeTopStories(results, count) {
        this.storyTitles = new Map();
        const storyTitles = [];
        for (var i = 0; i < results.length; i++) {
            (await this.getHackerNewsSingleStory(results[i])).subscribe(response => {
                let ress = this.populateStoriesMap(response, count);
            });
        }
        let computedWords = this.computeWords(count);
        console.log(computedWords);
        return computedWords;
    }
    async computeWordsInLastWeekStories(results, days) {
        console.log(results);
        this.storyTitles = new Map();
        const storyTitles = [];
        for (var i = 0; i < results.length; i++) {
            (await this.getHackerNewsSingleStory(results[i])).subscribe(response => {
                let ress = this.populateThisWeekStoriesMap(response, days);
            });
        }
        let computedWords = this.computeWords(days);
        return computedWords;
    }
    getHackerNewsTopStories() {
        this.topStoryIDs$ = this.httpService.get(`https://hacker-news.firebaseio.com/v0/showstories.json`).pipe((0, rxjs_1.map)((response) => response.data));
        return this.topStoryIDs$;
    }
    populateStoriesMap(response, count) {
        this.storyTitles.set(response.id, response.title);
        return this.computeWords(count);
    }
    populateThisWeekStoriesMap(response, days) {
        var date = new Date();
        date.setDate(date.getDate() - 7);
        if (response.time > (date.getTime())) {
            console.log(response.time);
            this.storyTitles.set(response.id, response.title);
        }
        return this.computeWords(days);
    }
    async getHackerNewsSingleStory(storyID) {
        this.topStory$ = this.httpService.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`).pipe((0, rxjs_1.map)((response) => response.data));
        return this.topStory$;
    }
};
RecentStoriesService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RecentStoriesService);
exports.RecentStoriesService = RecentStoriesService;
function empty(count) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=recent-stories.service.js.map