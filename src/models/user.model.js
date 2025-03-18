export default class UserModel {
    constructor(id, name, email, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }

    static getById(id){
      return users.find(user => user.id == id);
    }

    static getAll(){
        return users;
    }
  
    static add(name, email, password) {
      const newUser = new UserModel(
        users.length + 1,
        name,
        email,
        password
      );
      users.push(newUser);
    }
  
    static isValidUser(email, password) {
      const result = users.find(
        (u) =>
          u.email == email && u.password == password
      );
      return result;
    }
  }
  
var users = [
  new UserModel(1, "Ghandev", "ghandev@gmail.com", "password"),
  new UserModel(2, "Rahul", "rahul@gmail.com", "password"),
];
  