const {readFileSync}=require('fs')
let data1=JSON.parse(readFileSync('battles.json'))

var attacker_king_all=[];
var defender_king_all=[];
var region_all=[];
var names_all=[];
var battle_type_all=[];
let defender_size_max=0;
let defender_size_avg=0;
let defender_size_min=2147483647;
let win=0;
let loss=0;
const getKeyByValue = (obj, value) => 
        Object.keys(obj).find(key => obj[key] === value);


data1.forEach(element => {
    //building attacker_king [key-->attacker_king, value-->count]
    if(attacker_king_all[element.attacker_king]==undefined)
    {
        attacker_king_all[element.attacker_king]=1;
    }
    else{
        attacker_king_all[element.attacker_king]++;
    }
    
    //building defender_king [key-->defender_king, value-->count]
    if(defender_king_all[element.defender_king]==undefined)
    {
        defender_king_all[element.defender_king]=1;
    }
    else{
        defender_king_all[element.defender_king]++;
    }

    //building  regions [key-->region name, value-->count]
    if(region_all[element.region]==undefined)
    {
       region_all[element.region]=1;
    }
    else{
        region_all[element.region]++;
    }
    //building name [key-->name, value-->count]
    if(names_all[element.name]==undefined)
    {
        names_all[element.name]=1;
    }
    else{
        names_all[element.name]++;
    }

    //building battle_type [key-->battle_type, value-->count]
    if(element.battle_type!=null&&element.battle_type!=''){
        if(battle_type_all[element.battle_type]==undefined)
        {
            battle_type_all[element.battle_type]=1;
        }
        else{
            battle_type_all[element.battle_type]++;
        }
    }
    //counting no of wins and losses
    if(element.attacker_outcome=="win"){
        win++;
    }
    else{
        loss++;
    }
    //finding defender_size_max ,defender_size_avg and defender_size_min excluding null
    if(defender_size_max<element.defender_size&&element.defender_size!=null){
        defender_size_max=element.defender_size
    }
    if(defender_size_min>element.defender_size&&element.defender_size!=null){
        defender_size_min=element.defender_size
    }
    if(element.defender_size!=null){
        defender_size_avg=element.defender_size
    }
 });

  var attacker_king_max=Math.max.apply(null,Object.values(attacker_king_all))
  attacker_king_result= getKeyByValue(attacker_king_all,attacker_king_max)
  //console.log(attacker_king_result)
  
  var defender_king_max=Math.max.apply(null,Object.values(defender_king_all))
  defender_king_result= getKeyByValue(defender_king_all,defender_king_max)
 // console.log(defender_king_result)
  
  var region_max=Math.max.apply(null,Object.values(region_all))
  region_result= getKeyByValue(region_all,region_max)
 // console.log(region_result)
  
  var names_max=Math.max.apply(null,Object.values(names_all))
  names_result= getKeyByValue(names_all,names_max)
  
  var final=[];

  final["most_active"]={
    'attacker_king': attacker_king_result,
    'defender_king': defender_king_result,
    'region': region_result,
    'name':"All the Names occur only once",
    "name_list":names_all
  }
  
  final["attacker_outcome"]={
    'win':win,
    'loss':loss
  }
  
  final["battle_type"]=Object.keys(battle_type_all)


  final["defender_size"]={
    'average':defender_size_avg/data1.length,
    'min':defender_size_min,
    'max':defender_size_max
  }
  console.log(final)