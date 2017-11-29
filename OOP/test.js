function punchDamage() {
    return Math.floor(Math.random() * 5)
}
function kickDamage() {
    return Math.floor(Math.random() * 15) + 5;
}
function test(i,y) {
    return i instanceof y;
}
function dog() {}
function Ninja(name) {
    this.name = name;
    this.health = 100;
    const speed = 3;
    const strength = 3;

    Ninja.prototype.sayName = function(){
        console.log("My name is ${this.name}, greetings.");
    };
    Ninja.prototype.showStats = function(){
        console.log(`This are the stats of the ninja. Speed: ${speed} Strength: ${strength}`);
    };
    this.drinkSake = function(){
        this.health += 10
        console.log(this.health);
    };
    this.punch = function(name){
        if (test(name,Ninja) == true) {
            name.health -= punchDamage()
            console.log(`You punched ${name.name}. His health is ${name.health}.`);
        }
        else {
            console.log("That's not your enemy.");
        }
    };
    this.kick = function(name){
        if (test(name,Ninja) == true) {
            name.health -= kickDamage()
            console.log(`You kicked ${name.name},  His health is ${name.health}.`);
        }
        else {
            console.log("That's not your enemy.");
        }
    };
};

const Ganon = new Ninja("Ganon")
const Link = new Ninja("Link")
const Dog = new dog()
console.log("Ready");
