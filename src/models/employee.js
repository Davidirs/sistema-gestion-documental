class Employee {
    constructor(data) {
        this.uid = data.uid;
        //this.image = data.image;
        this.name = data.name;
        //this.ci = data.ci;
        this.department = data.department;
        this.position = data.position||null;
        this.entrydate = data.entrydate||null;
        this.bloodgroup = data.bloodgroup||null;
        this.fileslocation = data.fileslocation||null;
      }
  
    fromJson(json) {
      this.uid = json['uid'];
      //this.image = json['image'];
      this.name = json['name'];
      //this.ci = json['ci'];
      this.department = json['department'];
      this.position = json['position'];
      this.entrydate = json['entrydate'];
      this.bloodgroup = json['bloodgroup'];
      this.fileslocation = json['fileslocation'];
    }
  
    toJson() {
      const data = {};
      data['uid'] = this.uid;
      //data['image'] = this.image;
      data['name'] = this.name;
      //data['ci'] = this.ci;
      data['department'] = this.department;
      data['position'] = this.position;
      data['entrydate'] = this.entrydate;
      data['bloodgroup'] = this.bloodgroup;
      data['fileslocation'] = this.fileslocation;
      return data;
    }
  }
  
  // Export the Employee class
  export default Employee;