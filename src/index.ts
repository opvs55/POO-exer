import express, { Request, Response } from 'express'
import cors from 'cors'
import { VideoDataBase } from './database/VideosDataBase'
import { Videos } from './models/videos'
import { TvideoDB } from './types'


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.get("/videos", async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string | undefined 

        const videoDataBase = new VideoDataBase()
        const videosDB = await videoDataBase.findUsers(q)

        const videos: Videos[] = videosDB.map((userDB) => new Videos(
            userDB.id,
            userDB.title,
            userDB.duration,
            userDB.created_at
        ))

        res.status(200).send(videos)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/videos", async (req: Request, res: Response) => {
    try {
        const { id, title, duration } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof title !== "string") {
            res.status(400)
            throw new Error("'title' deve ser string")
        }

        if (typeof duration !== "string") {
            res.status(400)
            throw new Error("'duration' deve ser string")
        }

        const videoDataBase = new VideoDataBase()
        const videoDBExists = await videoDataBase.findVideoById(id)

        if (videoDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const newVideo = new Videos(
            id,
            title,
            duration,
            new Date().toISOString()
        ) // yyyy-mm-ddThh:mm:sssZ

        const newVideoDB: TvideoDB = {
            id: newVideo.getId(),
            title: newVideo.getTitle(),
            duration: newVideo.getDuration(),
            created_at: newVideo.getCreatedAt()
        }

        await videoDataBase.insertVideo(newVideoDB)
        res.status(201).send(newVideo)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
