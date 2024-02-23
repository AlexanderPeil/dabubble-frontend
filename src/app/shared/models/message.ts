export class MessageContent {
    id: number;
    created_at: Date;
    created_by: number;
    content: string;
    emotes?: Emote;
    files?: FileMeta[];


    constructor(object?: any) {
        this.id = object?.id || null;
        this.created_at = object?.created_at ? new Date(object.created_at) : new Date();
        this.created_by = object?.created_by;
        this.content = object?.content || '';
        this.emotes = object?.emotes || {};
        this.files = object?.files || [];
    }


    public toJSON(): any {
        const json: any = {
            id: this.id,
            created_at: this.created_at,
            created_by: this.created_by,
            content: this.content,
            emotes: this.emotes,
            files: this.files
        };
    }

}


interface Emote {
    [key: string]: number;
}  


interface FileMeta {
    url: string;
    name?: string;
}