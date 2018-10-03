// getting type of variable function
window.datatype = function(data){
    var cons = data.constructor.toString().toLowerCase().replace("function ","");
    var pos = cons.indexOf("(");
    var returnValue = cons.substr(0,pos);
    return returnValue;
};
// foreachin function
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
// comparing two objects function
Object.equals = function( x, y ) {
    if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

    if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for ( var p in x ) {
        if ( ! x.hasOwnProperty( p ) ) continue;
        // other properties were tested using x.constructor === y.constructor

        if ( ! y.hasOwnProperty( p ) ) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

        if ( x[ p ] === y[ p ] ) continue;
        // if they have the same strict value or identity then they are equal

        if ( typeof( x[ p ] ) !== "object" ) return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
        // Objects and Arrays must be tested recursively
    }

    for ( p in y ) {
        if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
        // allows x[ p ] to be set to undefined
    }
    return true;
};
// comparing two arrays function
Array.equals = function (a, b) {
    // array.equals
    var returnValue = true;
    if (typeof a !== "undefined" && typeof b !== "undefined" && a instanceof Array && b instanceof Array){
        var aString = JSON.stringify(a);
        var bString = JSON.stringify(b);
        if (aString !== bString){
            returnValue = false;
        }
    }else{
        returnValue = false;
    }
    return returnValue;
};
// array contains function
Array.prototype.contains = function(a){
    // array.contains
    var returnValue = false;
    if (typeof a !== "undefined"){
        for (var item in this){
            var itemValue = this[item];
            if (typeof a === "object"){
                if (Object.equals(itemValue,a)){
                    returnValue = true;
                }
            }else{
                if (itemValue === a){
                    returnValue = true;
                }
            }
        }
    }
    return returnValue;
};
// array remove function
Array.prototype.remove = function(a){
    // array.remove
    var arr = this.slice(0);
    if (typeof a !== "undefined"){
        if (typeof a === "object"){
            arr = [];
            for (var item in this){
                var itemValue = this[item];
                if (typeof itemValue === "function"){
                    var itemValueString = itemValue.toString();
                    if (itemValueString.includes("array.equals") !== true && itemValueString.includes("array.contains") !== true && itemValueString.includes("array.remove") !== true && itemValueString.includes("array.replace") !== true){
                        if (Object.equals(itemValue,a) !== true){
                            arr.push(itemValue);
                        }
                    }
                }else{
                    if (Object.equals(itemValue,a) !== true){
                        arr.push(itemValue);
                    }
                }
            }
        }else{
            var pos = this.indexOf(a);
            if (pos >= 0){
                arr.splice(pos,1);
            }
        }
    }else{
        arr = [];
    }
    return arr;
};
// array replace function
Array.prototype.replace = function(a,b){
    // array.replace
    var arr = this.slice(0);
    if (typeof a !== "undefined"){
        if (typeof a === "object"){
            arr = [];
            for (var item in this){
                var itemValue = this[item];
                if (typeof itemValue === "function"){
                    var itemValueString = itemValue.toString();
                    if (itemValueString.includes("array.equals") !== true && itemValueString.includes("array.contains") !== true && itemValueString.includes("array.remove") !== true && itemValueString.includes("array.replace") !== true){
                        if (Object.equals(itemValue,a) === true){
                            arr.push(b);
                        }else{
                            arr.push(itemValue);
                        }
                    }
                }else{
                    if (Object.equals(itemValue,a) === true){
                        arr.push(b);
                    }else{
                        arr.push(itemValue);
                    }
                }
            }
        }else{
            var pos = this.indexOf(a);
            if (pos >= 0){
                arr[pos] = b;
            }
        }
    }
    return arr;
};
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


























