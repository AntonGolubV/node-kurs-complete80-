const path = require("path");
const fs = require("fs");
const dataApple = require("./iphone.json");
const dataSamsung = require("./samsung.json");
const dataHonor = require("./honor.json");
const dataRealme = require("./realme.json");
const dataPoco = require("./poco.json");
const dataVivo = require("./vivo.json");
const dataXiaomi = require("./xiaomi.json");
const dataHuawei = require("./huawei.json");

const allData = [dataApple, dataSamsung, dataHonor, dataRealme, dataPoco, dataVivo, dataXiaomi, dataHuawei];

function dataSmartphone(brand) {
    let smartFilteredObj;
    switch (brand) {
        case "iphone":
            smartFilteredObj = filterObjects(dataApple.products, ["id", "key", "extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "samsung":
            smartFilteredObj = filterObjects(dataSamsung.products, ["id", "key", "extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "honor":
            smartFilteredObj = filterObjects(dataHonor.products, ["id", "key", "extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "realme":
            smartFilteredObj = filterObjects(dataRealme.products, ["id", "key", "extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "poco":
            smartFilteredObj = filterObjects(dataPoco.products, ["id", "key", "extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "vivo":
            smartFilteredObj = filterObjects(dataVivo.products, ["id", "key", "extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "xiaomi":
            smartFilteredObj = filterObjects(dataXiaomi.products, ["id", "key", "extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "huawei":
            smartFilteredObj = filterObjects(dataHuawei.products, ["id", "key", "extended_name", "images", "description", "prices", "description_list"]);
            break;
    }
    return smartFilteredObj;
}

function filterObjects(array, keys) {
    return array.map((obj) => {
        const filteredObj = {};
        keys.forEach((key) => {
            if (obj.hasOwnProperty(key)) {
                filteredObj[key] = obj[key];
            }
        });
        return filteredObj;
    });
}



function filterByParam(obj) {
    let arrBrand = [];
    let filteredBrand = [];
    for (let item in obj) {
        if (item == "brand" && obj[item]) {
            for(let i = 0; i < obj[item].length; i++){
                arrBrand.push(dataSmartphone(obj[item][i]));
            }
        }
    }
    for (let i = 0; i < arrBrand.length; i++) {
        for (let k = 0; k < arrBrand[i].length; k++) {
            if (arrBrand[i][k].prices != null && parseInt(arrBrand[i][k].prices.price_min.amount) >= parseInt(obj.price[0]) && parseInt(arrBrand[i][k].prices.price_min.amount) <= parseInt(obj.price[1])) {
                filteredBrand.push(arrBrand[i][k]);
                
            }
        }
    }

    let filteredBrand2 = filterSmrtfnByParam(filteredBrand, obj.storage, 'память'); 
    let filteredBrand3 = filterSmrtfnByParam(filteredBrand2, obj.ram, 'озу'); 
    let filteredBrand4 = filterSmrtfnByParam(filteredBrand3, obj.camera, 'камера');  
    let filteredBrand5 = filterSmrtfnByParam(filteredBrand4, obj.hz, 'гц', 4); 
    
    return filteredBrand5;
}

function filterSmrtfnByParam(arr, obj_param, incl, num = 1){
    let newArr = [];
    let variable;
    for (let i = 0; i < arr.length; i++) {
        for(let k = 0; k < arr[i].description_list.length; k++){
            if(arr[i].description_list[k].toLowerCase().includes(incl)){
                variable = arr[i].description_list[k].split(" ");
                newArr = check(newArr, arr[i], variable[parseInt(num)], obj_param);
                }
            } 
        }
        return newArr
    }
  
 function check(newArr, obj, strArr, obj_param) {
    if (parseInt(obj_param[0]) <= parseInt(strArr) && parseInt(obj_param[1]) >= parseInt(strArr)) {
        newArr.push(obj);
    } 
    return newArr;
}  

function getDeviceBySubname(subname) {
    const results = [];
    for(let i = 0; i < allData.length; i++){
      for(let k = 0; k < allData[i].products.length; k++){
        if(allData[i].products[k].full_name.toLowerCase().includes(subname.toLowerCase())){
            results.push(allData[i].products[k]);
        }
      }  
    }
    return results.length > 0 ? results : null; 
  }

module.exports = {
    dataSmartphone,
    filterByParam,
    getDeviceBySubname,
};
