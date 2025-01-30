class Department {
    constructor(data) {
        this.uid = data.uid;
        this.name = data.name;
      }
  
    fromJson(json) {
      this.uid = json['uid'];
      this.name = json['name'];
    }
  
    toJson() {
      const data = {};
      data['uid'] = this.uid;
      data['name'] = this.name;
      return data;
    }
  }
  
  // Export the Department class
  export default Department;