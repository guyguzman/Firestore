function Person(name, age, citizen) {
    this.name = name;
    this.age = age;
    this.citizen = citizen;
    this.fullName = function() {
        return this.name + " " + this.age;
    }
}