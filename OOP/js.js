function Ninja(name, health) {
    this.name = Echo
    this.health = 100
    const speed = 3
    const strength = 3

    ninja.sayName = function(){
        console.log("My name is ${this.name}, greetings.");
    };
    ninja.showStats = function(){
        console.log("This are the stats of the ninja. Speed: ${this.speed} Strength: ${this.strength}");
    };
    ninja.drinkSake = function(){
        this.health = health + 10
    };
};
