function formFixAll(){
    formFixSelects();
    formFixRadios();
    formFixTexts();

}
/*-----------------------------------------------------*/
function formFixSelects(){
    $(".cls-form-select").each(function(){
        var select = $(this);
        var header = $(this).find(".cls-form-select-header");

        var emptyArray = [];
        select.data("value",emptyArray);

        if (select.data("open") == true){
            select.find(".cls-form-select-option").show();
            header.removeClass("noBottomBorder");
            select.find(".cls-form-select-header-icon").html("");
        }else{
            select.find(".cls-form-select-option").hide();
            header.addClass("noBottomBorder");
            select.find(".cls-form-select-header-icon").html("");
        }

        select.find(".cls-form-select-option").each(function(){
            var option = $(this);
            if (select.data("type") == "multiple"){
                if (option.data("selected") == true){
                    header.find(".text").append($("<span class='values'></span>").html(option.html()));
                    select.data("value").push(option.html().toString().toLowerCase());
                    option.addClass("cls-form-select-option-selected");
                }
            }else{
                if (option.data("selected") == true){
                    header.find(".text").html(option.html());
                    select.data("value").push(option.html().toString().toLowerCase());
                }
            }

            header.unbind("click");
            header.bind("click",function(e){
                if (select.data("open") == true){
                    select.find(".cls-form-select-header").toggleClass("noBottomBorder");
                    select.find(".cls-form-select-option").hide();
                    select.data("open",false);
                    select.find(".cls-form-select-header-icon").html("");
                    e.stopPropagation();
                }
            });

            option.unbind("click");
            option.bind("click",function(){
               if (select.data("type") == "multiple"){
                   if (option.data("selected") == true){
                       option.data("selected",false);
                       option.removeClass("cls-form-select-option-selected");
                       var arr = select.data("value").remove(option.html().toString().toLowerCase());
                       select.data("value",arr);
                       header.find(".text .values").each(function(){
                           if ($(this).html() == option.html()){
                               $(this).remove();
                           }
                       });
                   }else{
                       option.data("selected",true);
                       option.addClass("cls-form-select-option-selected");
                       if (select.data("value").contains(option.html().toString().toLowerCase()) != true){
                           select.data("value").push(option.html().toString().toLowerCase());
                       }
                       header.find(".text").append($("<span class='values'></span>").html(option.html()));
                   }
               }else{
                   select.find(".cls-form-select-option").not(option).each(function(){
                       $(this).data("selected",false);
                   });
                   option.data("selected",true);
                   header.find(".text").html(option.html());
                   select.data("value",[]);
                   select.data("value").push(option.html().toString().toLowerCase());
               }

                if (select.data("value").length > 0){
                    select.data("selected",true);
                }else{
                    select.data("selected",false);
                }
            });
        });

        if (select.data("value").length > 0){
            select.data("selected",true);
        }else{
            select.data("selected",false);
        }

        select.unbind("click");
        select.bind("click",function(){
            if (select.data("open") == true){
                if (select.data("type") != "multiple"){
                    select.find(".cls-form-select-option").fadeOut(300);
                    select.data("open",false);
                    header.addClass("noBottomBorder");
                    select.find(".cls-form-select-header-icon").html("");
                }
            }else{
                select.find(".cls-form-select-option").fadeIn(300);
                select.data("open",true);
                header.removeClass("noBottomBorder");
                select.find(".cls-form-select-header-icon").html("");
            }
        });

        select.data("close",function(){
            if (select.data("open") == true){
                select.find(".cls-form-select-header").toggleClass("noBottomBorder");
                select.find(".cls-form-select-option").hide();
                select.data("open",false);
                select.find(".cls-form-select-header-icon").html("");
            }
        });

        select.data("getValue",function(){
            if (select.data("type") == "multiple"){
                if (select.data("value").length > 0){
                    return JSON.stringify(select.data("value"));
                }else{
                    return "[]";
                }
            }else{
                if (select.data("value").length > 0){
                    return select.data("value")[0];
                }else{
                    return "";
                }
            }
        });
    });
    $(document).bind("click",function(event){
        if ($(".cls-form-select").has(event.target).length == 0 && $(event.target) != $(".cls-form-select")){
            $(".cls-form-select").each(function(){
                if ($(this).data("open") == true){
                    $(this).data("close")();
                }
            });
        }
    });
}

function formFixRadios(){
    $(".cls-form-radio").each(function(){
        var radio = $(this);
        var type = radio.data("type");

        var emptyArray = [];
        radio.data("value",emptyArray);

        radio.find(".cls-form-radio-option").each(function(){
            if ($(this).data("selected") == true){
                $(this).find(".cls-form-radio-option-icon").fadeIn(300);
                $(this).addClass("cls-form-radio-option-selected");
                radio.data("value").push($(this).find(".text").html().toString().toLowerCase());
            }else{
                $(this).find(".cls-form-radio-option-icon").fadeOut(300);
                $(this).removeClass("cls-form-radio-option-selected");
            }

            $(this).unbind("click");
            $(this).bind("click",function(){
                if (type == "alternate"){
                    if ($(this).data("selected") == true){
                        radio.data("value",[]);
                        radio.find(".cls-form-radio-option").not($(this)).each(function(){
                            $(this).data("selected",true);
                            $(this).find(".cls-form-radio-option-icon").fadeIn(300);
                            $(this).addClass("cls-form-radio-option-selected");
                            radio.data("value").push($(this).find(".text").html().toString().toLowerCase());
                        });
                        $(this).data("selected",false);
                        $(this).find(".cls-form-radio-option-icon").fadeOut(300);
                        $(this).removeClass("cls-form-radio-option-selected");
                        var arr = radio.data("value").remove($(this).find(".text").html().toString().toLowerCase());
                        radio.data("value",arr);
                    }else{
                        radio.find(".cls-form-radio-option").not($(this)).each(function(){
                            $(this).data("selected",false);
                            $(this).find(".cls-form-radio-option-icon").fadeOut(300);
                            $(this).removeClass("cls-form-radio-option-selected");
                            var arr = radio.data("value").remove($(this).find(".text").html().toString().toLowerCase());
                            radio.data("value",arr);
                        });
                        $(this).data("selected",true);
                        $(this).find(".cls-form-radio-option-icon").fadeIn(300);
                        $(this).addClass("cls-form-radio-option-selected");
                        if (radio.data("value").contains($(this).find(".text").html().toString().toLowerCase()) != true){
                            radio.data("value").push($(this).find(".text").html().toString().toLowerCase());
                        }
                    }
                }else if (type == "multiple"){
                    if ($(this).data("selected") == true){
                        $(this).data("selected",false);
                        $(this).find(".cls-form-radio-option-icon").fadeOut(300);
                        $(this).removeClass("cls-form-radio-option-selected");
                        var arr = radio.data("value").remove($(this).find(".text").html().toString().toLowerCase());
                        radio.data("value",arr);
                    }else{
                        $(this).data("selected",true);
                        $(this).find(".cls-form-radio-option-icon").fadeIn(300);
                        $(this).addClass("cls-form-radio-option-selected");
                        if (radio.data("value").contains($(this).find(".text").html().toString().toLowerCase()) != true){
                            radio.data("value").push($(this).find(".text").html().toString().toLowerCase());
                        }
                    }
                }else{
                    if ($(this).data("selected") == true){
                        radio.find(".cls-form-radio-option").each(function(){
                            $(this).data("selected",false);
                            $(this).find(".cls-form-radio-option-icon").fadeOut(300);
                            $(this).removeClass("cls-form-radio-option-selected");
                        });
                        var arr = radio.data("value").remove($(this).find(".text").html().toString().toLowerCase());
                        radio.data("value",arr);
                    }else{
                        radio.find(".cls-form-radio-option").not($(this)).each(function(){
                            $(this).data("selected",false);
                            $(this).find(".cls-form-radio-option-icon").fadeOut(300);
                            $(this).removeClass("cls-form-radio-option-selected");
                        });
                        $(this).data("selected",true);
                        $(this).find(".cls-form-radio-option-icon").fadeIn(300);
                        $(this).addClass("cls-form-radio-option-selected");
                        radio.data("value",[]);
                        radio.data("value").push($(this).find(".text").html().toString().toLowerCase());
                    }
                }
                if (radio.data("value").length > 0){
                    radio.data("selected",true);
                }else{
                    radio.data("selected",false);
                }
            });
        });
        if (radio.data("value").length > 0){
            radio.data("selected",true);
        }else{
            radio.data("selected",false);
        }

        radio.data("getValue",function(){
            if (radio.data("type") == "multiple"){
                if (radio.data("value").length > 0){
                    return JSON.stringify(radio.data("value"));
                }else{
                    return "[]";
                }
            }else{
                if (radio.data("value").length > 0){
                    return radio.data("value")[0];
                }else{
                    return "";
                }
            }
        });
    });
}

function formFixTexts(){
    $(".cls-form-text").each(function(){
        var text = $(this);
        if (typeof text.data("value") !== "undefined" && text.data("value") !== ""){
            var value = text.data("value").toString();
            text.val(value);
        }
        text.data("value",text.val());
        text.unbind("keyup");
        text.bind("keyup",function(e){
            $(this).data("value",$(this).val());
        });
    });

}

