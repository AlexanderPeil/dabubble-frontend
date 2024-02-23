export class Channel {
  id: number;
  title: string;
  description?: string;
  members: number[];
  created_by_full_name : string;


  constructor(obj?: any) {
    this.id = obj ? obj.id : null;
    this.title = obj ? obj.title : '';
    this.description = obj ? obj.description : '';
    this.members = obj ? obj.members : [];
    this.created_by_full_name  = obj ? obj.created_by_full_name  : null;
  }


  public toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      members: this.members,
      created_by: this.created_by_full_name ,
    };
  }
}