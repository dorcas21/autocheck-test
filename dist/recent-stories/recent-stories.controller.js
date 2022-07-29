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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentStoriesController = void 0;
const common_1 = require("@nestjs/common");
const recent_stories_service_1 = require("./recent-stories.service");
let RecentStoriesController = class RecentStoriesController {
    constructor(recentStoriesService) {
        this.recentStoriesService = recentStoriesService;
    }
    getTopStories(count) {
        return this.recentStoriesService.getTopStories(count);
    }
    getThisWeekStories(days) {
        return this.recentStoriesService.getLastWeekStories(days);
    }
    getStoriesBasedOnKarma(karma) {
        return this.recentStoriesService.getStoriesByKarma(karma);
    }
};
__decorate([
    (0, common_1.Get)('top-stories/:count'),
    __param(0, (0, common_1.Param)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RecentStoriesController.prototype, "getTopStories", null);
__decorate([
    (0, common_1.Get)('stories-by-time/:days'),
    __param(0, (0, common_1.Param)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RecentStoriesController.prototype, "getThisWeekStories", null);
__decorate([
    (0, common_1.Get)('stories-by-karma/:karma'),
    __param(0, (0, common_1.Param)('karma')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RecentStoriesController.prototype, "getStoriesBasedOnKarma", null);
RecentStoriesController = __decorate([
    (0, common_1.Controller)('recent-stories'),
    __metadata("design:paramtypes", [recent_stories_service_1.RecentStoriesService])
], RecentStoriesController);
exports.RecentStoriesController = RecentStoriesController;
//# sourceMappingURL=recent-stories.controller.js.map