function createSort(arr) {
    arr = sortArr(arr);
    return arr;
}
function sortArr(arr) {
    arr.sort((a, b) => {
        if (a.prices == null) {
            return 1;
        }
        if (b.prices == null) {
            return 0;
        }
        if (b.prices != null && a.prices != null) {
            return b.prices.price_min.amount - a.prices.price_min.amount;
        }
    });
    return arr;
}
function pushNewObjById(newArr, id, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (id == arr[i].id) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
function pushNewObjByKey(newArr, key, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (key == arr[i].key) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

function templ(string, smart) {
    for (let key in smart) {
        if (key == "images") {
            for (let item in smart[key]) {
                if (item == "header") {
                    string = string.replace(`{{${key}}}`, `${smart[key][item]}`);
                }
            }
        }
        if (key == "prices" && smart.prices) {
            string = string.replace(`{{${key}}}`, `${smart.prices.price_min.amount} BYN`);
        }

        if (key == "prices" && !smart.prices) {
            string = string.replace(`{{${key}}}`, `Нет в наличии`);
        }
        string = string.replace(`{{${key}}}`, `${smart[key]}`);
    }
    return string;
}

function delObj(arr, id = '', key = '') {
    let newArr = [];
    if(id){
        for (let i = 0; i < arr.length; i++) {
            if (id != arr[i].id) {
                newArr.push(arr[i]);
            }
        }
    }if(key){
        for (let i = 0; i < arr.length; i++) {
            if (key != arr[i].key) {
                newArr.push(arr[i]);
            }
        }
    }
    return newArr;
}

module.exports = {
    createSort,
    pushNewObjById,
    pushNewObjByKey,
    delObj,
    templ,
};
