class Document {
    constructor(data) {
        this.uid = data.uid;
        this.url = data.url;
        this.title = data.title;
        this.enddate = data.enddate;
        //this.type = data.type;
        this.fileslocation = data.fileslocation||null;
      }
  
    fromJson(json) {
      this.uid = json['uid'];
      this.url = json['url'];
      this.title = json['title'];
      this.enddate = json['enddate'];
      //this.type = json['type'];
      this.fileslocation = json['fileslocation'];
    }
  
    toJson() {
      const data = {};
      data['uid'] = this.uid;
      data['url'] = this.url;
      data['title'] = this.title;
      data['enddate'] = this.enddate;
      //data['type'] = this.type;
      data['fileslocation'] = this.fileslocation;
      return data;
    }
  }
  
  // Export the Document class
  export default Document;