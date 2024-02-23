export class Channel {
  id: number;
  title: string;
  description?: string;
  members: number[];
  created_by: number;


  constructor(obj?: any) {
    this.id = obj ? obj.id : null;
    this.title = obj ? obj.title : '';
    this.description = obj ? obj.description : '';
    this.members = obj ? obj.members : [];
    this.created_by = obj ? obj.created_by : null;
  }


  public toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      members: this.members,
      created_by: this.created_by,
    };
  }
}