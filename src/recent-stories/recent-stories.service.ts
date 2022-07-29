import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { response } from "express";
import { lastValueFrom, map, Observable, tap } from "rxjs";
import { Logger } from '@nestjs/common';
import { ServerResponse } from "http";

@Injectable({})
export class RecentStoriesService{

    private topStoryIDs$: Observable<Object>;
    private topStory$: Observable<Object>;
    private result$ : Observable<Object>;
    private storyTitles: Map<Number,String>;
    private firstTenWords;
    private story;

constructor(private httpService:HttpService){}

    async getTopStories(count){
        //call the api to get latest 25 stories
        (await this.getHackerNewsTopStories()).subscribe(response=>this.computeTopStories(response,count));

         return this.computeTopStories(response,count);

    }

   


   //fetch stories based on time
   async  getLastWeekStories(days){

         //call the api to get latest 25 stories
         (await this.getHackerNewsTopStories()).subscribe(response=>this.computeWordsInLastWeekStories(response,days));

         return this.computeWordsInLastWeekStories(response,days);

    }



 


    //fetch stories based on user karma
    getStoriesByKarma(karma){
        const results = this.httpService.get(`https://hacker-news.firebaseio.com/v0/showstories.json`).pipe(map((response)=>response.data));

        return this.computeKarmaBasedStories(results, karma)
    }

    computeKarmaBasedStories(results, karma){
     return results;

    }


        //function to compute most ocurring words in all the story titles
        computeWords(count){

            if(count==null){
                return []

            }
            
            if(this.storyTitles.size==count){
    
                let wordFrequencies = new Map()
                for (let [key, value] of this.storyTitles) {
    
                  let words =   value.split(" ")  
                  for(const word of words){
                    //check if words exists in hashmap
                    if(!wordFrequencies.has(word)){
                    wordFrequencies.set(word,1)
                    }else{
                        wordFrequencies.set(word,wordFrequencies.get(word)+1)
                    }
                  }
     
                    }
    
    
                    const mapSort2 = new Map([...wordFrequencies.entries()].sort((a, b) => b[1] - a[1]));
                    
                    let words = Array.from( mapSort2.keys() );
    
    
                    this.firstTenWords = words.slice(0, 10);
    
            }
            return {
                "statusCode":310,
                    "statusDescription":"Top Ten Occurring Words",
                    "data":this.firstTenWords
            }
        
        }



   async computeTopStories(results,count){
    //compute latest 25 stories


    this.storyTitles = new Map();
    const storyTitles = []
    for(var i=0;i<results.length;i++){
         (await this.getHackerNewsSingleStory(results[i])).subscribe(response=>  {

            //add each storyTitle to a map
           let ress = this.populateStoriesMap(response,count);

        });
        
    }

    //call method to calculate top 10 most occuring words
    let computedWords = this.computeWords(count)
    console.log(computedWords)
  return computedWords;
}

async computeWordsInLastWeekStories(results,days){
    //compute words in last week stories

    // console.log(days)
    console.log(results)
    this.storyTitles = new Map();
    const storyTitles = []
    for(var i=0;i<results.length;i++){
         (await this.getHackerNewsSingleStory(results[i])).subscribe(response=>  {

            //add each storyTitle to a map
           let ress = this.populateThisWeekStoriesMap(response,days);

        });
        
    }

    //call method to calculate top 10 most occuring words
    let computedWords = this.computeWords(days)
  return computedWords;
}

getHackerNewsTopStories():Observable<Object>{

    this.topStoryIDs$ = this.httpService.get(`https://hacker-news.firebaseio.com/v0/showstories.json`).pipe(
        map((response)=>response.data));
    return this.topStoryIDs$;
}




//put all the story response IDs response titles in a map, and invoke a method to check most occuring words in the titles
populateStoriesMap(response,count){
    this.storyTitles.set(response.id,response.title)

    return this.computeWords(count);
}

    //put all the story response IDs response titles in map where timestamp is greator than seven days ago
    populateThisWeekStoriesMap(response,days){
        var date = new Date();
        date.setDate(date. getDate() - 7);
      
        if(response.time > (date.getTime())){
            console.log(response.time)
            this.storyTitles.set(response.id,response.title)
        }
        

        return this.computeWords(days);
    }






async getHackerNewsSingleStory(storyID):Promise<Observable<Object>>{

    this.topStory$ = this.httpService.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`).pipe(
        map((response)=>response.data));
    return this.topStory$;
}


}

function empty(count: any) {
    throw new Error("Function not implemented.");
}
