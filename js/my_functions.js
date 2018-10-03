// getting type of variable function (returns name of its type in lower case)
window.datatype = function(data){
    var cons = data.constructor.toString().toLowerCase().replace("function ","");
    var pos = cons.indexOf("(");
    var returnValue = cons.substr(0,pos);
    return returnValue;
};
// -------------------------------------------------------------------------------
// foreachin function (for loop) (first paramenter is the object. second paramenter is the function excuting for each item (key,value,index,length). third paramenter (reverse) is to give boolean value if you want the loop to start from oposite direction)
window.foreachin = function (obj,func,reverse){
    var length = 0;
    var keys = undefined;
    var values = undefined;
    try {
        keys = Object.keys(obj);
        values = Object.keys(obj).map(function(key){
            return obj[key];
        });
        length = keys.length;
    } catch(e) {
        length = 0;
    }
    if (reverse === true){
        if (length > 0){
            for (var i = length - 1;i >= 0;i--){
                func(keys[i],values[i],i,length);
            }
        }
    }else{
        if (length > 0){
            for (var i = 0;i < length;i++){
                func(keys[i],values[i],i,length);
            }
        }
    }
};
// -------------------------------------------------------------------------------
// comparing two objects function (returns boolean)
Object.equals = function(a,b){
    if (typeof a === "object" && typeof b === "object"){
        if (JSON.stringify(a) === JSON.stringify(b)){
            return true;
        }else{
            return false;
        }
    }else{
        try{
            if (JSON.stringify(a) === JSON.stringify(b)){
                return true;
            }else{
                return false;
            }
        }catch(e){
            if (a === b){
                return true;
            }else{
                return false;
            }
        }
    }
};
// comparing two arrays function (returns boolean)
Array.equals = function(a,b){
    if (typeof a === "object" && typeof b === "object"){
        if (JSON.stringify(a) === JSON.stringify(b)){
            return true;
        }else{
            return false;
        }
    }else{
        try{
            if (JSON.stringify(a) === JSON.stringify(b)){
                return true;
            }else{
                return false;
            }
        }catch(e){
            if (a === b){
                return true;
            }else{
                return false;
            }
        }
    }
};
// -------------------------------------------------------------------------------
// array contains function (if second paramenter (array) is false it returns boolean. if second paramenter (array) is true it returns array of containg items in given array as first parameter but if doesn't contain anything given array it returns false)
Array.prototype.contains = function(a,array){
    var arr = this;
    if (typeof a === "object"){
        if (typeof array !== "undefined" && array == true){
            var returnArray = [];
            foreachin(a,function(key,value,index,length){
                if (typeof value === "object"){
                    foreachin(arr,function(k,v,i,l){
                        if (Object.equals(value,v)){
                            returnArray.push(value);
                        }
                    });
                }else{
                    var pos = arr.indexOf(value);
                    if (pos >= 0){
                        returnArray.push(value);
                    }
                }
            });
            if (returnArray.length > 0){
                return returnArray;
            }else{
                return false;
            }
        }else{
            var returnValue = false;
            foreachin(arr,function(k,v,i,l){
                if (Object.equals(a,v)){
                    returnValue = true;
                }
            });
            return returnValue;
        }
    }else{
        var pos = arr.indexOf(a);
        if (pos >= 0){
            return true;
        }else{
            return false;
        }
    }
};
// array remove function (if second paramenter (array) is false it returns the same array except removen item. if second paramenter (array) is true it returns the same array except those removen items which were given in first paramenter as array)
Array.prototype.remove = function(a,array){
    var arr = Object.assign(this);
    var returnArray = [];
    if (typeof a === "object"){
        if (typeof array !== "undefined" && array == true){
            returnArray = arr;
            foreachin(a,function(key,value,index,length){
                returnArray = returnArray.remove(value);
            });
        }else{
            foreachin(arr,function(k,v,i,l){
                if (Object.equals(a,v) != true){
                    returnArray.push(v);
                }
            });
        }
    }else{
        foreachin(arr,function(k,v,i,l){
            if (v != a){
                returnArray.push(v);
            }
        });
    }
    return returnArray;
};
// array replace function (if second paramenter (array) is false it replaces the first paramenter with the second paramenter. if second paramenter (array) is true for each item in array which is given in the first paramenter it replaces the item with the second paramenter but if the second paramenter is an array it will replace those items in the first paramenter with the second paramenter in order)
Array.prototype.replace = function(a,b,array){
    var arr = Object.assign(this);
    var returnArray = [];
    if (typeof a === "object"){
        if (typeof array !== "undefined" && array == true){
            returnArray = arr;
            foreachin(a,function(key,value,index,length){
                if (typeof b === "object"){
                    returnArray = returnArray.replace(value,b[index]);
                }else{
                    returnArray = returnArray.replace(value,b);
                }
            });
        }else{
            foreachin(arr,function(k,v,i,l){
                if (Object.equals(a,v)){
                    returnArray.push(b);
                }else{
                    returnArray.push(v);
                }
            });
        }
    }else{
        foreachin(arr,function(k,v,i,l){
            if (v == a){
                returnArray.push(b);
            }else{
                returnArray.push(v);
            }
        });
    }
    return returnArray;
};
// -------------------------------------------------------------------------
// string replace all in string
String.prototype.replaceAll = function(f,r,c){
    if (c == true){
        return this.replace(new RegExp(f,"g"),r);
    }else{
        return this.replace(new RegExp(f,"gi"),r);
    }
};
// String remove all
String.prototype.removeAll = function(f,c){
    if (c == true){
        return this.replace(new RegExp(f,"g"),"");
    }else{
        return this.replace(new RegExp(f,"gi"),"");
    }
};
// Capitalize the first letter of string
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
// Check if string contains substring or word or letter
String.prototype.contains = function(word){
    return this.indexOf(word) != -1;
};














// Other functions
// ---------------------------------------------------------
// removing arrays duplicated values function
function arrayRemoveDuplicate(arr){
    var uniqueArray = arr.filter(function(elem, pos){
        return arr.indexOf(elem) == pos;
    });
    return uniqueArray;
};
// Creating templates
function template(temp,prop,c){
    for (var p in prop){
        temp = temp.replaceAll("{{" + p + "}}",prop[p],c);
    }
    return temp;
}
// Number limitation function +999
function limitNumber(v,limit,hideZero){
    if (hideZero == true){
        if (parseInt(v) == 0){
            return "";
        }else{
            if (parseInt(v) > parseInt(limit)){
                return "+" + limit;
            }else{
                return v;
            }
        }
    }else{
        if (parseInt(v) > parseInt(limit)){
            return "+" + limit;
        }else{
            return v;
        }
    }
}
// String limitation function like "karimi..."
function limitString(v,limit){
    if (v.length > limit){
        return v.substring(0,limit - 2) + "...";
    }else{
        return v;
    }
}
// get difference between two numbers function
function getDifference(n1,n2){
    var r = n1 - n2;
    return Math.abs(r);
}
//display english date function
function displayEnglishDate(v,dialog,hideTime){

    if (typeof v === "string"){
        v = new Date(v);
    }

    var now = new Date();
    var min = v.getMinutes();
    var hour = v.getHours();
    var date = v.getDate();
    var month = v.getMonth();
    var year = v.getFullYear();
    var nmin = now.getMinutes();
    var nhour = now.getHours();
    var ndate = now.getDate();
    var nmonth = now.getMonth();
    var nyear = now.getFullYear();
    var englishMonth;
    var display = "";

    if (dialog == true){
        if (min < 10){
            min = "0" + min;
        }
        if (hour < 10){
            hour = "0" + hour;
        }

        var diffMin = parseInt(Math.abs(v - now) / 60000);
        if (diffMin < 5){
            // now
            display = "now";
        }else if (diffMin > 4 && diffMin < 60){
            // minutes ago
            display = diffMin + " minutes ago";
        }else if (diffMin > 59 && diffMin < 1440){
            // hours ago
            var hours = parseInt(diffMin / 60);
            if (hours > 1){
                display = hours + " hours ago";
            }else{
                display = hours + " hour ago";
            }
        }else if (diffMin > 1439 && diffMin < 10080){
            // days ago
            var days = parseInt((diffMin / 60) / 24);
            if (days > 1){
                display = days + " days ago";
            }else{
                display = "yesterday at " + hour + ":" + min;
            }
        }else if (diffMin > 10079 && diffMin < 43200){
            // weeks ago
            var weeks = parseInt(((diffMin / 60) / 24) / 7);
            if (weeks > 1){
                display = weeks + " weeks ago";
            }else{
                display = "last week";
            }
        }else if (diffMin > 43199 && diffMin < 518400){
            // months ago
            var months = parseInt(((diffMin / 60) / 24) / 30);
            if (months > 1){
                display = months + " months ago";
            }else{
                display = "last month";
            }
        }else if (diffMin > 518399){
            // years ago
            var years = parseInt((((diffMin / 60) / 24) / 30) / 12);
            if (years > 1){
                display = years + " years ago";
            }else{
                display = "last year";
            }
        }

    }else{
        if (min < 10){
            min = "0" + min;
        }
        if (hour < 10){
            hour = "0" + hour;
        }

        switch(month){
            case 0:
                englishMonth = "Jan";
                break;
            case 1:
                englishMonth = "Feb";
                break;
            case 2:
                englishMonth = "Mar";
                break;
            case 3:
                englishMonth = "Apr";
                break;
            case 4:
                englishMonth = "May";
                break;
            case 5:
                englishMonth = "June";
                break;
            case 6:
                englishMonth = "July";
                break;
            case 7:
                englishMonth = "Aug";
                break;
            case 8:
                englishMonth = "Sept";
                break;
            case 9:
                englishMonth = "Oct";
                break;
            case 10:
                englishMonth = "Nov";
                break;
            case 11:
                englishMonth = "Dec";
                break;
        }

        if (hideTime == true){
            display = date + " " + englishMonth + " " + year;
        }else{
            display = hour + ":" + min + " " + date + " " + englishMonth + " " + year;
        }
    }

    return display;
}
// detecting browser information (name,version) function
function get_browser_info(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE ',version:(tem[1]||'')};
    }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
    }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
        name: M[0],
        version: M[1]
    };
}
// validating email function
function validateEmail($email){
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}
// check if string exist in value after removing all spaces
function existString($string){
    if (typeof $string !== "undefined"){
        var nString = $string.removeAll(" ");
        if (nString.length > 0){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
// check if number is even function
function isEven(value){
    if (value%2 == 0){
        return true;
    }else{
        return false;
    }
}
// getting set of number inside total amount which includes the target number
function getSetAroundNumber(target,around,total,returnRest){
    var half = 0;
    if (isEven(around)){
        half = around / 2;
    }else{
        half = (around - 1) / 2;
    }

    var set1 = [];
    var set2 = [];
    var set3 = [];

    if ((target - half) > 0 && (target + half) <= total){
        for (var i = half;i > 0;i--){
            set1.push(target - i);
        }

        set1.push(target);

        for (var i = 1;i < (half + 1);i++){
            set1.push(target + i);
        }
    }else{
        if ((target - half) <= 0){
            for (var i = 1;i < ((half * 2) + 1) + 1;i++){
                set1.push(i);
            }
        }else if ((target + half) > total){
            for (var i = total - (half * 2);i < total + 1;i++){
                set1.push(i);
            }
        }
    }

    if (returnRest == true){
        if (set1[0] > 1){
            for (var i = 1;i < set1[0];i++){
                set2.push(i);
            }
        }

        if (set1[set1.length - 1] < total){
            for (var i = set1[set1.length - 1] + 1;i < total + 1;i++){
                set3.push(i);
            }
        }

        return [set1,set2,set3];
    }else{
        return set1;
    }
}
// function for removing element from an array
function removeFromArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}


























