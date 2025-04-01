class Employed {
    constructor(data) {
        this.ubicacionExp = data.ubicacionExp;
        this.cargo = data.cargo;
        this.date = data.date;
        this.departament = data.departament;
        this.ci = data.ci;
        this.name = data.name;
        this.bloodgroup = data.bloodgroup;
      }
  
    fromJson(json) {
      this.name = json['name'];
      this.ci = json['ci'];
      this.departament = json['departament'];
      this.cargo = json['cargo'];
      this.date = json['date'];
      this.ubicacionExp = json['ubicacionExp'];
      this.bloodgroup = json['bloodgroup'];
    }
  
    toJson() {
      const data = {};
      data['name'] = this.name;
      data['ci'] = this.ci;
      data['departament'] = this.departament;
      data['cargo'] = this.cargo;
      data['date'] = this.date;
      data['ubicacionExp'] = this.ubicacionExp;
      data['bloodgroup'] = this.bloodgroup;
      return data;
    }
  }
  
  // Export the Employed class
  export default Employed;