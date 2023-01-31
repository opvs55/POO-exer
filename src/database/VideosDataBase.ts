import { TvideoDB } from "../types";
import { BaseDataBase } from "./baseDatabase";


export class VideoDataBase extends BaseDataBase{

    public static TABLE_VIDEOS = "videos"
    public async findUsers(q: string | undefined){

        let videosDB

        if (q) {
            const result: TvideoDB[] = await BaseDataBase 
            .connection(VideoDataBase.TABLE_VIDEOS)
            .where("video", "LIKE", `%${q}%`)

            videosDB = result
        } else {
            const result: TvideoDB[] = await BaseDataBase
            .connection(VideoDataBase.TABLE_VIDEOS)


            videosDB = result
        }
        return videosDB  
    }

    public async findVideoById(id:string){
        const [videosDB]: TvideoDB[] | undefined[] = await BaseDataBase
        .connection(VideoDataBase.TABLE_VIDEOS)
        .where({id})

        return videosDB
    }
    public async insertVideo(newVideoDB: TvideoDB){
        await BaseDataBase
        .connection(VideoDataBase.TABLE_VIDEOS)
        .insert(newVideoDB)
    }
}
