class User {
    constructor(data) {
        this.uid = data.uid;
        this.email = data.email;
        this.displayName = data.displayName;
        this.photoURL = data.photoURL;
        this.rol = data.rol||null;
      }
  
    fromJson(json) {
      this.displayName = json['displayName'];
      this.rol = json['rol'];
      this.photoURL = json['photoURL'];
      this.email = json['email'];
      this.uid = json['uid'];
    }
  
    toJson() {
      const data = {};
      data['displayName'] = this.displayName;
      data['rol'] = this.rol;
      data['photoURL'] = this.photoURL;
      data['email'] = this.email;
      data['uid'] = this.uid;
      return data;
    }
  }
  
  // Export the User class
  export default User;