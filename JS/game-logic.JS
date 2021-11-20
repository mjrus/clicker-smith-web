/*Global Variables*/
var currGame;   // the is the active game class.
var noClick = 0;
var matSelected = null;
var typeSelected = null;
/*Class *Material|Constructor|* this will hold the variables on the sword material */
var Material = function(name,hardness,value,src){
    this.name = name; 
    this.hardness = hardness;
    this.value = value;
    this.src = "Image/material/" + src;
}
/*Class *Material|Instances|*/
var wood = new Material("Wood", 18, 50,"wood.png");
var bronze = new Material("Bronze", 124,171,"bronze.png");
var iron = new Material("Iron", 37, 251,"iron.png");
var steel = new Material("Steel", 50, 384,"steel.png");

/* Class *Type|Constructor| this will hold the value for the sword type*/
var Type = function(name,difficulty,valueMod,src){
    this.name = name;
    this.difficulty = difficulty;
    this.valueMod = valueMod;
    this.src = "Image/type/" + src;
}
/*Class *Type|Instances|*/
var broad = new Type("Broad Sword",1.5, 1,"broad.png");
var short = new Type("Short Sword",3,0.9,"short.png");
var great = new Type("Great Sword",4.5,1.6,"great.png");
var curved = new Type("Curved Sword", 6, 2.4,"curved.png");

/*Class *Sword|Constructor|*This class is to bring the sword together it will contain a material and a sword type and will have methods and variables*/
var Sword = function(material,Type){
    this.material = material;
    this.Type = Type;
    this.name = material.name + " " + Type.name;
    this.progress = 0;
    this.baseValue = this.material.value * this.Type.valueMod;
}

/* Class *Player|Constructor|* This is the player class it will hold the player stats and gold + exp */
var Player = function(){
    this.gold = 0; //the currency of the game. How much the player has 
    this.exp = 0; //experince earned after each forge
    this.str = 1; //how easy the player gets through the swords hardness; 
    this.acc = 1; // this is accuracy, it deals with how many of the hits will be proper hits. proper hit eqauls full progress tick|miss hit equals half progress tick|square hit equals  1.5(can be upgrade elsewhere)progress tick
    this.sta = 1;//how short of pause in between the next hit is(this will affect when the player can click again)
    this.spd = 1; //how many hits the player makes(this will decide how many hits one click equates to)
    this.skl = 1; //skill,modifier that will impact the Type difficulty;
    this.cha = 1; //charisma, modifer for when the sword is sold;
    this.lvl = 1; //this is the level of the player max 24; 
}
/* Class *Workshop|Constructor|* This will hold the data about each of the workshop upgrades*/
var Workshop = function(){
    this.forge = 1; //the will help in decreasing the hardness of the material 
    this.hammer = 1;//this will help the difficulty 
    this.anvil = 1;//this will help with the accuracy
}
var Town = function(){
    this.merchantGuild = 1;
    this.mine = 1;
    this.researcher = 1;
}
/* Class *Game|Constructor|* this will hold details about the game*/
var Game = function(){
    this.Player = new Player();
    this.Sword = new Sword(wood, short);
    this.Workshop = new Workshop();
    this.Town = new Town();
    this.unspentLvl = 0;
}

//Load function, will check if save file is present if so then will load saved progress else it will initilise a new game.
var load = function(){
    if(localStorage.getItem("save") === null){
        localStorage.setItem( "save", JSON.stringify(new Game())); 
    }
    currGame = JSON.parse(localStorage.getItem("save"));
    if(currGame.Sword == null){
        currGame.Sword = new Sword(wood, short);
    }
    
    $('#mine .statButton').attr("value",currGame.Town.mine * 100 + "g");
    $('#merchant .statButton').attr("value",currGame.Town.merchantGuild * 100 + "g");
    $('#researcher .statButton').attr("value",currGame.Town.researcher * 100 + "g");
    $('#goldAmount').text(currGame.Player.gold + "g");

    
    if(currGame.Town.mine >= 5){
        $('#mine .statLvl').text("MAX");
    }else{
        $('#mine .statLvl').text(currGame.Town.mine);
    }
    if(currGame.Town.merchantGuild >= 5){
        $('#merchant .statLvl').text("MAX");
    }else{
        $('#merchant .statLvl').text(currGame.Town.merchantGuild);
    }
    if(currGame.Town.researcher >= 5){
        $('#researcher .statLvl').text("MAX");
    }else{
        $('#researcher .statLvl').text(currGame.Town.researcher);
    }
    $('#lvlAmount').text(currGame.unspentLvl);
    if(currGame.Player.str >= 5){
        $('#strength .statLvl').text("MAX");
    }else{
        $('#strength .statLvl').text(currGame.Player.str);
    }
    if(currGame.Player.acc >= 5){
        $('#accuracy .statLvl').text("MAX");
    }else{
        $('#accuracy .statLvl').text(currGame.Player.acc);
    }
    if(currGame.Player.sta >= 5){
        $('#stamina .statLvl').text("MAX");
    }else{
        $('#stamina .statLvl').text(currGame.Player.sta);
    }
    if(currGame.Player.spd >= 5){
        $('#speed .statLvl').text("MAX");
    }else{
        $('#speed .statLvl').text(currGame.Player.spd);
    }
    if(currGame.Player.skl >= 5){
        $('#skill .statLvl').text("MAX");
    }else{
        $('#skill .statLvl').text(currGame.Player.skl);
    }
    if(currGame.Player.cha >= 5){
        $('#charisma .statLvl').text("MAX");
    }else{
        $('#charisma .statLvl').text(currGame.Player.cha);
    }
    
    $('#strength .statButton').on("click",function(){
        alert("CLicker");
        if(currGame.unspentLvl != 0 ){
            if(!(currGame.Player.str >= 5)){
                currGame.Player.str++;
                currGame.unspentLvl--;
                save();
                location.reload();
            }
        }else{
            alert("you have no points to spend");
        }
    })
    $('#accuracy .statButton').on("click",function(){
        if(currGame.unspentLvl != 0 ){
            if(!(currGame.Player.acc >= 5)){
                currGame.Player.acc++;
                currGame.unspentLvl--;
                save();
                location.reload();
            }
        }else{
            alert("you have no points to spend");
        }
    })
    $('#stamina .statButton').on("click",function(){
        if(currGame.unspentLvl != 0 ){
            if(!(currGame.Player.sta >= 5)){
                currGame.Player.sta++;
                currGame.unspentLvl--;
                save();
                location.reload();
            }
        }else{
            alert("you have no points to spend");
        }
    })
    $('#speed .statButton').on("click",function(){
        if(currGame.unspentLvl != 0 ){
            if(!(currGame.Player.spd >= 5)){
                currGame.Player.spd++;
                currGame.unspentLvl--;
                save();
                location.reload();
            }
        }else{
            alert("you have no points to spend");
        }
    })
    $('#skill .statButton').on("click",function(){
        if(currGame.unspentLvl != 0 ){
            if(!(currGame.Player.skl >= 5)){
                currGame.Player.skl++;
                currGame.unspentLvl--;
                save();
                location.reload();
            }
        }else{
            alert("you have no points to spend");
        }
    })
    $('#charisma .statButton').on("click",function(){
        if(currGame.unspentLvl != 0 ){
            if(!(currGame.Player.cha >= 5)){
                currGame.Player.cha++;
                currGame.unspentLvl--;
                save();
                location.reload();
            }
        }else{
            alert("you have no points to spend");
        }
    })
    $('#swordTitleText').text(currGame.Sword.name);
    $('#swordProgress').text("Progress:\t" + currGame.Sword.progress+"%");
}

var save = function(){
    localStorage.setItem( "save", JSON.stringify(currGame)); 
}
var makeProgress = function(){ 
    var accuracyLvls= 1.2  + ((currGame.Player.acc * 10)/100);//different stages of accuracy 
    var anvilBonus = 1 + (currGame.Workshop.anvil);
    var forgeHeat = currGame.Workshop.forge * 5;
    var skillLvl= 1 - ((currGame.Player.skl * 10)/100);
    var hammerLvl = 1 - ((currGame.Workshop.hammer * 10) / 100);
    var strengthLvl = currGame.Player.str * 0.3;
    var opposingFactor = (currGame.Sword.material.hardness - (forgeHeat * strengthLvl)) * (currGame.Sword.Type.difficulty * (hammerLvl * skillLvl));
    var roll = (Math.floor(Math.random() * 10));
    if(roll < opposingFactor){
        currGame.Sword.progress += 6;
    }
    if(roll > opposingFactor){
        currGame.Sword.progress += 12;
    }
    if(roll > opposingFactor * 2){
        currGame.Sword.progress += 24;
    }
    if(currGame.Sword.progress >= 100){
        currGame.Sword.progress = 100;
        sellSword();
    }
    $('#swordProgress').text("Progress:\t" + currGame.Sword.progress+"%");
    save();
}
var sellSword = function(){
    var nextLvl =  Math.ceil(((currGame.Player.lvl * 1.1)/1.5)*10);
    var goldEarned = Math.floor((currGame.Sword.baseValue ^ currGame.Player.cha) / (5 - (currGame.Town.merchantGuild*0.5))); 
    var expEarned = (goldEarned / 3) * 2;
  
    currGame.Player.gold += goldEarned;
    if(currGame.Player.lvl >= 25){
        currGame.Player.exp = nextLvl;
    }else{
        currGame.Player.exp += expEarned;
    }
    if(!(currGame.Player.lvl >= 25)){
        while(currGame.Player.exp >= nextLvl){
            currGame.Player.exp -= nextLvl;
            currGame.Player.lvl++;
            currGame.unspentLvl++;
            var nextLvl =  Math.ceil(((currGame.Player.lvl * 1.1)/1.5)*10);

        }
    }

    
    $('#playerXpEarnedAmount').text(expEarned);
    $('#playerXpBar').width(((currGame.Player.exp/nextLvl)*100) + '%');
    $('#swordClick').text(noClick);
    $('#swordName').text(currGame.Sword.name);
    $('#swordGold').text(goldEarned+"g");
    if(currGame.Player.lvl >= 25){
        $('#playerLvl').text("MAX");
        $('#playerLvl').css('font-size', 48);
    }else{
        $('#playerLvl').text(currGame.Player.lvl);
    }
    if(currGame.Town.mine >= 1){
        addMaterial(wood);
    }
    if(currGame.Town.mine >=2){
        addMaterial(bronze);
    }
    if(currGame.Town.mine >= 3){
        addMaterial(iron);
    }
    if(currGame.Town.mine >= 4){
        addMaterial(steel);
    }
    if(currGame.Town.researcher >= 1){
        addType(short);
    }
    if(currGame.Town.researcher >= 2){
        addType(broad);
    }
    if(currGame.Town.researcher >= 3){
        addType(great);
    }
    if(currGame.Town.researcher >= 4){
        addType(curved);
    }


   $('#playerXpCount').text(currGame.Player.exp + "/" + nextLvl);
    noClick = 0;
    currGame.Sword.progress = 0;
    $('#swordMenu').show();
}
var addMaterial = function(mat){
    $('#materialContainer').append($('<div></div>',{"class":'card'})
                                    .append($('<div></div',{"class":'cardName'}).text(mat.name))
                                    .append($('<img>',{"class": 'cardImg'}).attr("src", mat.src))
                                    .append($('<input>',{"class": 'cardChoose', type: 'button', value: 'Select'}).on('click',function(){
        $('#materialContainer .card').removeClass('selected');
        matSelected = mat;
        $(this).parent().addClass('selected');
        console.log(matSelected);
        }))
    );
}
var addType = function(type){
    $('#swordTypeContainer').append($('<div></div>',{"class":'card'})
                                    .append($('<div></div',{"class":'cardName'}).text(type.name))
                                    .append($('<img>',{"class": 'cardImg'}).attr("src", type.src))
                                    .append($('<input>',{"class": 'cardChoose', type: 'button', value:'Select'}).on("click",function(){
        $('#swordTypeContainer .card').removeClass('selected');
        typeSelected = type;
        $(this).parent().addClass('selected');
        console.log(typeSelected);
    })));
}
var addSword = function(){
  
    if(matSelected == null || typeSelected ==null){
        alert("You have not selected both a material and sword type, please select one of each before submiting");
        return;
    }
    currGame.Sword = new Sword(matSelected,typeSelected);
    $('#swordTitleText').text(currGame.Sword.name);
    $('#swordMenu').hide();
    save();
    location.reload();
}
var anvilClick = function(){ 
    var staminaLevels=[2500,1931,1430,1006,679,500]; //different stages of stamina 
    noClick++;
    for(var i = 0; i<currGame.Player.spd;i++ ){
        makeProgress();
    }
    setTimeout(function(){
        $('#anvil').on("click", anvilClick);
    }, staminaLevels[currGame.Player.sta]);    
    $('#anvil').off();
}
var addHammer = function(){
    $('#anvil').attr("class",'forgeCursor');
}
$(document).ready(function(){
    $('#anvil').on("click", anvilClick);
});