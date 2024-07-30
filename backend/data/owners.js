const House = require("../models/House")
const Owner = require("../models/Owner")


async function fetchHouses(){
    let houses = await House.find({})

    if(houses){
        return houses
    }else{
        console.log("data not fetched");
    }
}

