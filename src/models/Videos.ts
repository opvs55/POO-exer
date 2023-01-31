export class Videos {
    constructor(
        private id: string,
        private title: string,
        private duration: string,
        private createdAt: string
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getTitle(): string {
        return this.title
    }

    public setTitle(value: string): void {
        this.title = value
    }


    public getDuration(): string {
        return this.duration
    }

    public setDuration(value: string): void {
        this.duration = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }
}