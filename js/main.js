$(document).ready(function(){
    // predefining settings -----------------------------------------------
    /*
    "style":style,
    "language":language,
    "mode":mode,
    "database":database,
    "item_name":item_name,
    "refresh":refresh,
    "printer":printer,
    "food_priority":priority,
    "page":page
    */
    // getting settings
    $.getJSON("php/get_settings.php?key=3h5h50j",function(data){
        $(document).data("settings",data);
        $(document).data("settings")["page"] = "cooking";

        // excuting orders ------------------------------------------------------------------
        // resetting all for the first time
        resetAll();
        droppableButton();

    }).fail(function(error){
        if (error.status === 0){
            showErrorMsg("no internet connection!");
        }else{
            showErrorMsg(error.statusText);
        }
    });
    // drag and drop -----------------------------------------------
    // drag and drop all elements function
    window.droppableButton = function(){
        $(".droppable").droppable({
            drop:function(event,ui){
                // console.log(ui.draggable.data('ids'));

                if ($(this).is("#btnReject")){
                    window.rejectItems(ui.draggable);
                }else if ($(this).is("#btnSuspend")){
                    window.suspendItems(ui.draggable);
                }else if ($(this).is("#btnSend")){
                    window.sendItems(ui.draggable);
                }
                ui.draggable.fadeOut(300);
                window.resetItemsStyle(); // reset all items style to default
            },
            tolerance:'pointer',
            hoverClass:'clsButtonDropHover',
            over:function(event,ui){
                if (window.mouseDown === true){
                    if ($(this).is("#btnReject")){
                        ui.draggable.toggleClass("clsItemDropHoverReject");
                    }else if ($(this).is("#btnSuspend")){
                        ui.draggable.toggleClass("clsItemDropHoverSuspend");
                    }else if ($(this).is("#btnSend")){
                        ui.draggable.toggleClass("clsItemDropHoverSend");
                    }
                }
            },
            out:function(event,ui){
                if ($(this).is("#btnReject")){
                    if (ui.draggable.hasClass("clsItemDropHoverReject")){
                        ui.draggable.toggleClass("clsItemDropHoverReject");
                    }
                }else if ($(this).is("#btnSuspend")){
                    if (ui.draggable.hasClass("clsItemDropHoverSuspend")){
                        ui.draggable.toggleClass("clsItemDropHoverSuspend");
                    }
                }else if ($(this).is("#btnSend")){
                    if (ui.draggable.hasClass("clsItemDropHoverSend")){
                        ui.draggable.toggleClass("clsItemDropHoverSend");
                    }
                }
            },

        });
    }
    window.draggableItem = function(item){
        $(item).draggable({
            zIndex:1000000,
            revert:true,
            revertDuration:250,
            scroll:true,
            scrollSpeed:20,
            snap:"#btnReject #btnSend #btnSuspend",



        });

        $(item).droppable({
            tolerance:'pointer',
            drop:function(event,ui){
                var sameItemId = $(this).data("datas")["menu_item_id"];
                // var description = $(this).data("datas")["description"];
                if (ui.draggable.data("datas")["menu_item_id"] === sameItemId /* && ui.draggable.data("datas")["description"] == description*/){
                    var arr = $(this).data('ids').concat(ui.draggable.data("ids"));
                    $(this).data('ids',arr);
                    var quantity = arr.length;
                    $(this).find("#spanQuantity").html(quantity);
                    if ($(this).data("ids").length > 1){
                        $(this).data('type',"folder");
                        $(this).find('.icon').html("");
                        $(this).find('.icon').css("color","#41BF4A");
                        if ($(this).data("priority") == true || ui.draggable.data("priority") == true){
                            $(this).data("priority",true);
                            $(this).toggleClass("clsItemFolderPriority");
                        }else{
                            $(this).toggleClass("clsItemFolder");
                        }
                        window.resetItemsStyle();
                        var self = $(this);
                        setTimeout(function(){
                            window.selectItem(self,false);
                        },100);
                    }else{
                        if ($(this).data("datas")["eat_type"] === 0){
                            $(this).data('type',"item");
                            $(this).find('.icon').html("");
                            $(this).toggleClass("clsItemFolder");
                        }else if ($(this).data("datas")["eat_type"] === 1){
                            $(this).data('type',"away");
                            $(this).find('.icon').html("");
                            $(this).find('.icon').css("color","orange");
                        }
                    }
                    ui.draggable.remove();
                }else{

                }
                // window.resetItemsStyle(); // reset all items style to default
            },
            over:function(event,ui){
                if (window.mouseDown == true){
                    var sameItemId = $(this).data("datas")["menu_item_id"];
                    if (ui.draggable.data("datas")["menu_item_id"] != sameItemId){
                        $(this).data("acceptable",false);
                        $(this).toggleClass("clsItemDropHoverError");
                        // ui.draggable.toggleClass("clsItemDropHoverError");
                    }else{
                        $(this).data("acceptable",true);
                        $(this).toggleClass("clsItemDropHoverDefault");
                        // ui.draggable.toggleClass("clsItemDropHoverDefault");
                    }
                }
            },
            out:function(event,ui){
                if ($(this).data("acceptable") === true){
                    if ($(this).hasClass("clsItemDropHoverDefault")){
                        $(this).toggleClass("clsItemDropHoverDefault");
                    }
                    /*if (ui.draggable.hasClass("clsItemDropHoverDefault")){
                        ui.draggable.toggleClass("clsItemDropHoverDefault");
                    }*/
                }else{
                    if ($(this).hasClass("clsItemDropHoverError")){
                        $(this).toggleClass("clsItemDropHoverError");
                    }
                    /*if (ui.draggable.hasClass("clsItemDropHoverError")){
                        ui.draggable.toggleClass("clsItemDropHoverError");
                    }*/
                }
            },
        });

    }

    // function to reset style of all items
    window.resetItemsStyle = function(){
        // $('.clsItem').removeClass("clsItemDropHoverDefault clsItemDropHoverReject clsItemDropHoverSend clsItemDropHoverSuspend clsItemDropHoverError clsItemOpacity20 clsItemOpacity90 clsItemHighlighted clsItemPriority clsItemFolder");
        $(".clsItem").each(function(){
            if ($(this).hasClass("clsItemDropHoverDefault")){
                $(this).toggleClass("clsItemDropHoverDefault");
            }

            if ($(this).hasClass("clsItemDropHoverReject")){
                $(this).toggleClass("clsItemDropHoverReject");
            }

            if ($(this).hasClass("clsItemDropHoverSend")){
                $(this).toggleClass("clsItemDropHoverSend");
            }

            if ($(this).hasClass("clsItemDropHoverSuspend")){
                $(this).toggleClass("clsItemDropHoverSuspend");
            }

            if ($(this).hasClass("clsItemDropHoverError")){
                $(this).toggleClass("clsItemDropHoverError");
            }

            if ($(this).hasClass("clsItemOpacity20")){
                $(this).toggleClass("clsItemOpacity20");
            }

            if ($(this).hasClass("clsItemOpacityFolder")){
                $(this).toggleClass("clsItemOpacityFolder");
            }

            if ($(this).hasClass("clsItemOpacity90")){
                $(this).toggleClass("clsItemOpacity90");
            }

            if ($(this).hasClass("clsItemHighlighted")){
                $(this).toggleClass("clsItemHighlighted");
            }

            if ($(this).hasClass("clsItemFolder")){
                $(this).toggleClass("clsItemFolder");
            }

            if ($(this).hasClass("clsItemPriority")){
                $(this).toggleClass("clsItemPriority");
            }

            if ($(this).hasClass("clsItemFolderPriority")){
                $(this).toggleClass("clsItemFolderPriority");
            }

            if ($(this).data('priority') === true){
                if ($(this).data('type') === "folder"){
                    $(this).toggleClass("clsItemFolderPriority");
                }else{
                    $(this).toggleClass("clsItemPriority");
                }
            }else{
                if ($(this).data('type') === "folder"){
                    $(this).toggleClass("clsItemFolder");
                }
            }

            // $(this).css("opacity","1");
        });
    };

    // select item function ---------------------------------------------
    window.selectItem = function(item,resetAll){
        if (resetAll){
            if (resetAll === true){
                window.resetItemsStyle();
            }
        }
        var sameItemId = item.data("datas")["menu_item_id"];
        // var description = item.data("datas")["description"];
        $(".clsItem").each(function(){
            if ($(this) !== item){
                $(this).data("selected",false);
            }
            if ($(this).data('datas')['menu_item_id'] === sameItemId /* && $(this).data('datas')['description'] == description */){
                $(this).toggleClass("clsItemOpacity90");
            }else{
                if ($(this).data("type") == "folder"){
                    $(this).toggleClass("clsItemOpacityFolder");
                }else{
                    $(this).toggleClass("clsItemOpacity20");
                }
            }
        });
        // note
        item.toggleClass("clsItemHighlighted");
        item.data("selected",true);
    };

    $(document).bind("click",function(event){
        var canReset = true;
        if ($(".clsItem").has(event.target).length != 0 || $(event.target) == $(".clsItem")){
            canReset = false;
        }
        if ($("#btnTop").has(event.target).length != 0 || event.target == $("#btnTop")[0]){
            canReset = false;
        }
        if (canReset !== false){
            window.resetItemsStyle();
        }
    });
    $(document).bind("mousedown",function(){
        window.mouseDown = true;
    });
    $(document).bind("mouseup",function(){
        window.mouseDown = false;
    });

    // application variables -----------------------------------------------
    window.loadingItemsInterval = null;
    window.updateExtraInverval = null;
    window.templateItem = "";
    window.templateSettings = ""
    window.totalItems = [];
    window.emptyWrapper = true;
    window.mouseDown = false;
    window.settingsTimeout = null;
    window.shownSettings = false;
    window.somethingChanged = false;

    // getting templates here ----------------------------------------------

    // getting item template
    $.get("template/item.html",function(data){
        window.templateItem = data;
    }).fail(function(error){
        window.templateItem = "";
        if (error.status === 0){
            showErrorMsg("no internet connection!");
        }else{
            showErrorMsg(error.statusText);
        }
    });

    // getting settings template
    $.get("template/settings.html",function(data){
        window.templateSettings = data;
    }).fail(function(error){
        window.templateSettings = "";
        if (error.status === 0){
            showErrorMsg("no internet connection!");
        }else{
            showErrorMsg(error.statusText);
        }
    });

    // function for updating items time
    window.updateTime = function(t,e){
        var displayTime = displayEnglishDate(t,true,false);
        $(e).html(displayTime);
    };

    // function for displaying only time of the date
    window.onlyTime = function(d){
        if (typeof d !== "undefined"){
            var t = d.split(" ")[1];
            var returnTime = t.split(":")[0] + ":" + t.split(":")[1];
            return returnTime;
        }
    }
    // function for creating item object --------------------------------------
    window.createItem = function(d,id){
        var tempText = window.templateItem;
        var temporaryDatas = Object.assign(d);
        var type = temporaryDatas['eat_type'];
        var is_make = temporaryDatas['is_make'];
        var rush = temporaryDatas['rush'];

        // console.log(rush);

        tempText = template(tempText,temporaryDatas);

        var temp = $(tempText);

        if (type == 1){
            temp.find(".away").css("display","inline-block");
            temp.data("type","away");
        }else{
            temp.data("type","item");
        }

        if (is_make == 5){
            temp.find(".rejected").css("display","inline-block");
        }else if (is_make == 1){
            if ($(document).data("settings")["mode"] == "kitchen"){
                temp.find(".done").css("display","inline-block");
                temp.find(".done").html("");
            }else if ($(document).data("settings")["mode"] == "pantry"){
                // nothing here
            }
        }else if (is_make == 2){
            temp.find(".done").css("display","inline-block");
            temp.find(".done").html("");
        }

        temp.data("datas",temporaryDatas);
        temp.data("ids",[id]);

        if ($(document).data("settings")['food_priority'] == "on"){
            if (rush == 1){
                // console.log("rush is true");
                temp.data('priority',true);
                temp.find(".priority").css("display","inline-block");
                temp.toggleClass("clsItemPriority");
            }else if (rush == 0){
                temp.data('priority',false);
            }
        }else{
            temp.data('priority',false);
        }

        if ($(document).data("settings")['page'] == "pending"){
            temp.find(".suspend").css("display","inline-block");
        }

        temp.find("#order_time").html(window.onlyTime(temporaryDatas['order_time']));
        temp.find("#wait_time").html(displayEnglishDate(temporaryDatas['order_time'],true,false));

        window.draggableItem(temp);

        return temp;
    };
    // function for inserting data inside wrapper as items --------------------
    window.insertItems = function (data){
        if (window.shownSettings != true){
            if ($(document).data("settings")['page'] == data[0]){
                var datas = data[1];
                var datasids = [];
                if (datas.length > 0){
                    for (var item in datas){
                        var id = datas[item]['order_detail_id'];
                        if (typeof id !== "undefined"){

                            datasids.push(id);
                            var exist = false;
                            $(".clsItem").each(function(){
                                if ($(this).data("ids").contains(id)){
                                    exist = true;
                                }
                            });
                            if (window.totalItems.contains(id) !== true && exist !== true){
                                window.totalItems.push(id);

                                var temp = window.createItem(datas[item],id);

                                if (window.emptyWrapper === true){
                                    window.somethingChanged = true;
                                    $("#itemsWrapper").css("background-image","none");
                                    window.emptyWrapper = false;
                                    $("#itemsWrapper").html(temp);
                                }else{
                                    window.somethingChanged = true;
                                    $("#itemsWrapper").append(temp);
                                    $(".clsItem").each(function(){
                                        if ($(this).data("selected") === true){
                                            window.selectItem($(this),true);
                                        }
                                    });
                                }
                            }

                        }
                    }
                }else{
                    $("#itemsWrapper").css("background-image","none");
                    window.totalItems = [];
                    window.emptyWrapper = true;
                    if ($(document).data("settings")['page'] == "cooking"){
                        $("#itemsWrapper").html($("<div class='emptyMessage' style='color:#41BF4A;border:1px solid #41BF4A;'></div>").html("No New Order Found!"));
                    } else if ($(document).data("settings")['page'] == "pending"){
                        $("#itemsWrapper").html($("<div class='emptyMessage' style='color:orange;border:1px solid orange;'></div>").html("No Pending Order Found!"));
                    } else if ($(document).data("settings")['page'] == "history"){
                        $("#itemsWrapper").html($("<div class='emptyMessage' style='color:#028EE8;border:1px solid #028EE8;'></div>").html("History Is Empty!"));
                    } else if ($(document).data("settings")['page'] == "rejects"){
                        $("#itemsWrapper").html($("<div class='emptyMessage' style='color:#C50706;border:1px solid #C50706;'></div>").html("No Rejected Order Found!"));
                    }
                }
                for (var id in window.totalItems){
                    if (datasids.contains(window.totalItems[id]) !== true){
                        window.totalItems = window.totalItems.remove(window.totalItems[id]);
                        $(".clsItem").each(function(){
                            if (Array.equals($(this).data("ids"),[window.totalItems[id]])){
                                $(this).remove();
                            }
                            if ($(this).data("ids").contains(window.totalItems[id])){
                                var arr = $(this).data("ids").remove(window.totalItems[id]);
                                $(this).data("ids".arr);
                            }
                        });
                    }
                }
            }else{
                $("#itemsWrapper").css("background-image","none");
                window.totalItems = [];
                return;
            }
        }
    }

    // function for clearing wrapper
    window.emptyItemsWrapper = function (){
        $("#itemsWrapper").html("");
    }

    // function for loading items from server
    window.loadingItems = function (){
        if (window.shownSettings != true){
            if (window.templateItem !== ""){
                var query = "";
                if ($(document).data("settings")["mode"] == "kitchen"){
                    if ($(document).data("settings")["page"] == "cooking"){
                        query ="?mode=kitchen&section=cooking&count=false";
                    }else if ($(document).data("settings")["page"] == "pending"){
                        query ="?mode=kitchen&section=pending&count=false";
                    }else if($(document).data("settings")["page"] == "history"){
                        query ="?mode=kitchen&section=history&count=false";
                    }else if ($(document).data("settings")["page"] == "rejects"){
                        query ="?mode=kitchen&section=rejects&count=false";
                    }

                }else if ($(document).data("settings")["mode"] == "pantry"){
                    if ($(document).data("settings")["page"] == "cooking"){
                        query ="?mode=pantry&section=cooking&count=false";
                    }else if ($(document).data("settings")["page"] == "pending"){
                        query ="?mode=pantry&section=pending&count=false";
                    }else if($(document).data("settings")["page"] == "history"){
                        query ="?mode=pantry&section=history&count=false";
                    }else if ($(document).data("settings")["page"] == "rejects"){
                        query ="?mode=pantry&section=rejects&count=false";
                    }

                }
                if (query != ""){
                    $.getJSON("php/get_items.php" + query,function(data){
                        hideErrorMessage();
                        if (typeof data === "object"){
                            window.insertItems(data);
                        }else{
                            $("#itemsWrapper").css("background-image","none");
                            showErrorMsg(data);
                        }
                    }).fail(function(error){
                        if (error.status === 0){
                            showErrorMsg("no internet connection!");
                        }else{
                            showErrorMsg(error.statusText);
                        }
                    });
                }else{
                    showErrorMsg("No query selected!");
                }

            }else{
                showErrorMsg("No template loaded for items!");
            }
        }
    }

    // selecting sections functions ------------------------------------------------
    // function for viewing cooking page
    window.viewCooking = function (){
        window.shownSettings = false;
        $(document).data("settings")["page"] = "cooking";
        resetAll();
        $("#btnSettings").find("span").fadeOut(300);
    }

    // function for viewing pending page
    window.viewPending = function (){
        window.shownSettings = false;
        $(document).data("settings")["page"] = "pending";
        resetAll();
        $("#btnSettings").find("span").fadeOut(300);
    }

    // function for viewing history page
    window.viewHistory = function (){
        window.shownSettings = false;
        $(document).data("settings")["page"] = "history";
        resetAll();
        $("#btnSettings").find("span").fadeOut(300);
    }

    // function for viewing rejected items page
    window.viewRejects = function (){
        window.shownSettings = false;
        $(document).data("settings")["page"] = "rejects";
        resetAll();
        $("#btnSettings").find("span").fadeOut(300);
    }

    // settings functions ----------------------------------------------------------
    // function for viewing setting page or div
    window.viewSettings = function (){
        $("#btnSettings").find("span").fadeIn(300);
        window.shownSettings = true;
        window.destroyAll();
        $(window).scrollTop(0);
        $("#itemsWrapper").css("background-image","none");
        // $(document).data("settings")['page'] = "settings";
        window.hideErrorMessage();
        var tempSettings = $(window.templateSettings);

        foreachin($(document).data("settings"),function(k,v,i,l){
            if (k == "language"){
                tempSettings.find("#select-language").children().each(function(){
                    if ($(this).html().toString().toLowerCase() == v){
                        $(this).data("selected",true);
                    }else{
                        $(this).data("selected",false);
                    }
                });
            }
            if (k == "mode"){
                tempSettings.find("#radio-mode").children().each(function(){
                    if ($(this).find(".text").html().toString().toLowerCase() == v){
                        $(this).data("selected",true);
                    }else{
                        $(this).data("selected",false);
                    }
                });
            }
            if (k == "database"){
                tempSettings.find("#text-database").data("value",v);
            }
            if (k == "refresh"){
                tempSettings.find("#label-seconds").data("value",parseInt(v));
                tempSettings.find("#label-seconds").html(v + "s");
            }
            if (k == "printer"){
                tempSettings.find("#radio-printer").children().each(function(){
                    if ($(this).find(".text").html().toString().toLowerCase() == v){
                        $(this).data("selected",true);
                    }else{
                        $(this).data("selected",false);
                    }
                });
            }
            if (k == "food_priority"){
                tempSettings.find("#radio-priority").children().each(function(){
                    if ($(this).find(".text").html().toString().toLowerCase() == v){
                        $(this).data("selected",true);
                    }else{
                        $(this).data("selected",false);
                    }
                });
            }
        });

        $("#itemsWrapper").html(tempSettings);

        formFixAll();

        $("#button-minus").unbind("click");
        $("#button-minus").bind("click",function(){
            if ($("#label-seconds").data("value") > 1){
                var ref = parseInt($("#label-seconds").data("value"));
                $("#label-seconds").data("value",ref - 1);
                $("#label-seconds").html((ref - 1) + "s");
            }
        });

        $("#button-plus").unbind("click");
        $("#button-plus").bind("click",function(){
            var ref = parseInt($("#label-seconds").data("value"));
            $("#label-seconds").data("value",ref + 1);
            $("#label-seconds").html((ref + 1) + "s");
        });

    }

    // function for saving settings and reset all from beginning
    window.saveSettings = function (){
        window.hideErrorMessage();
        var style = "";
        var item_name = "";
        var page = $(document).data("settings")["page"].toString().toLowerCase();
        var language = $("#select-language").data("getValue")().toString().toLowerCase();
        var mode = $("#radio-mode").data("getValue")().toString().toLowerCase();
        var database = $("#text-database").data("value");
        var refresh = parseInt($("#label-seconds").data("value"));
        var printer = $("#radio-printer").data("getValue")().toString().toLowerCase();
        var priority = $("#radio-priority").data("getValue")().toString().toLowerCase();

        var settingObj = {
            "style":style,
            "language":language,
            "mode":mode,
            "database":database,
            "item_name":item_name,
            "refresh":refresh,
            "printer":printer,
            "food_priority":priority,
            "page":page

        };

        if (JSON.stringify(settingObj) !== JSON.stringify($(document).data("settings"))){
            $(document).data("settings",settingObj);
            $.getJSON("php/set_settings.php?key=3h5h50j&settings=" + JSON.stringify(settingObj),function(data){
                if (data !== "saved"){
                    showErrorMsg("Couldn't save cookies!");
                }else{
                    resetAll();
                }
            }).fail(function(error){
                // nothing here
            });
        }else{
            // nothing here
        }

    }

    // remove ids from total ids ----------------------------------------------------
    window.removeFromTotal = function (ids){
        for (var id in ids){
            window.totalItems = window.totalItems.remove(ids[id]);
        }
    };

    // items record control functions -----------------------------------------------------
    // function for finishing items
    window.sendItems = function (item){
        var parent = item.parent();
        var ids = item.data("ids");
        window.changeItems(ids,"send",function(data){
            // console.log(data);
            if (data == true || data == "true"){
                window.removeFromTotal(ids);
            }else{
                window.showErrorMsg(data);
            }
        },function(data){
            window.showErrorMsg(data);
        })
        item.remove();
    }

    // function for suspending items
    window.suspendItems = function (item){
        var parent = item.parent();
        var ids = item.data("ids");
        window.changeItems(ids,"suspend",function(data){
            // console.log(data);
            if (data == true || data == "true"){
                window.removeFromTotal(ids);
            }else{
                window.showErrorMsg(data);
            }
        },function(data){
            window.showErrorMsg(data);
        })
        item.remove();
    }
    // function for rejecting items
    window.rejectItems = function(item){
        var parent = item.parent();
        var ids = item.data("ids");
        window.changeItems(ids,"reject",function(data){
            // console.log(data);
            if (data == true || data == "true"){
                window.removeFromTotal(ids);
            }else{
                window.showErrorMsg(data);
            }
        },function(data){
            window.showErrorMsg(data);
        })
        item.remove();
    }

    // changing items in database
    window.changeItems = function (ids,order,funcTrue,funcFalse){
        window.hideErrorMessage();
        var idsString = JSON.stringify(ids);
        var query = "?mode=" + $(document).data("settings")['mode'] + "&order=" + order + "&ids=" + idsString;
        $.get("php/change_items.php" + query,funcTrue).fail(funcFalse);

    }

    // setting event handlar for buttons ------------------------------------------------

    $("#btnList").bind("click",viewCooking);
    $("#btnReject").bind("click",viewRejects);
    $("#btnSuspend").bind("click",viewPending);
    $("#btnHistory").bind("click",viewHistory);
    $("#btnSettings").bind("click",function(){
        if (window.shownSettings != true){
            viewSettings();
        }else{
            viewCooking();
            window.shownSettings = false;
        }
    });
    $("#btnTop").bind("click",function(){
        $(window).scrollTop(0);
    });

    // handling with errors function ----------------------------------------------------
    // function to show the error messages
    window.showErrorMsg = function (msg){
        $("#messageBox").html(msg);

    }

    window.hideErrorMessage = function(){
        $("#messageBox").html("");
    }

    // timer for updating time
    window.setInterval(function(){
        $(".clsItem").each(function(){
            var item = $(this);
            var t = item.data("datas")['order_time'];
            window.updateTime(t,item.find("#wait_time"));

        });
    },60000)

    // updating amount of items in each page and prepending priority items
    window.updateExtra = function(){
        $.get("php/count_items.php?mode=" + $(document).data("settings")['mode'] + "&section=cooking",function(data){
            $("#btnList").find("span").html(data);
            if (data == 0){
                $("#btnList").find("span").hide();
            }else{
                $("#btnList").find("span").show();
            }
        }).fail(function(error){
            $("#btnList").find("span").html(error.status);
            if (error.status === 0){
                showErrorMsg("no internet connection!");
            }else{
                showErrorMsg(error.statusText);
            }
        });
        $.get("php/count_items.php?mode=" + $(document).data("settings")['mode'] + "&section=pending",function(data){
            $("#btnSuspend").find("span").html(data);
            if (data == 0){
                $("#btnSuspend").find("span").hide();
            }else{
                $("#btnSuspend").find("span").show();
            }
        }).fail(function(error){
            $("#btnSuspend").find("span").html(error.status);
            if (error.status === 0){
                showErrorMsg("no internet connection!");
            }else{
                showErrorMsg(error.statusText);
            }
        });
        $.get("php/count_items.php?mode=" + $(document).data("settings")['mode'] + "&section=history",function(data){
            $("#btnHistory").find("span").html(data);
            if (data == 0){
                $("#btnHistory").find("span").hide();
            }else{
                $("#btnHistory").find("span").show();
            }
        }).fail(function(error){
            $("#btnHistory").find("span").html(error.status);
            if (error.status === 0){
                showErrorMsg("no internet connection!");
            }else{
                showErrorMsg(error.statusText);
            }
        });
        $.get("php/count_items.php?mode=" + $(document).data("settings")['mode'] + "&section=rejects",function(data){
            $("#btnReject").find("span").html(data);
            if (data == 0){
                $("#btnReject").find("span").hide();
            }else{
                $("#btnReject").find("span").show();
            }
        }).fail(function(error){
            $("#btnReject").find("span").html(error.status);
            if (error.status === 0){
                showErrorMsg("no internet connection!");
            }else{
                showErrorMsg(error.statusText);
            }
        });

        // updating items
        if (window.totalItems.length > 0){
            var idsString = JSON.stringify(window.totalItems);
            // console.log(idsString);
            $.getJSON("php/update_items.php?ids=" + idsString,function(data){
                if (typeof data === "object" && data.length > 0){
                    foreachin(data,function(k,v,i,l){
                        var id = v["order_detail_id"];
                        if (typeof id !== "undefined"){
                            if (window.totalItems.contains(id)){
                                $(".clsItem").each(function(){
                                    if ($(this).data("ids").contains(id)){
                                        if (Object.equals($(this).data("datas"),v) != true){
                                            window.somethingChanged = true;
                                            var temp = window.createItem(v,id);
                                            $(this).replaceWith(temp);
                                            // console.log(temp[0]);
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }).fail(function(error){
                if (error.status === 0){
                    showErrorMsg("no internet connection!");
                }else{
                    showErrorMsg(error.statusText);
                }
            });

            // highlighting priority items
            if ($(document).data("settings")['food_priority'] == "on" && window.shownSettings != true){
                if (window.somethingChanged == true){
                    window.somethingChanged = false;
                    foreachin($(".clsItem"),function(k,v,i,l){
                        if ($(v).data("priority") == true && $(v).prev().data("priority") != true || $(v).data("priority") == true && $(v).is(":last-child")){
                            if ($(".clsItem").eq(0).data("priority") == true){
                                var ind = window.getLastPriorityItem();
                                // console.log(ind);
                                $(v).insertAfter($(".clsItem").eq(ind));
                                // $(".clsItem").eq(ind).insertAfter($(v));
                                // console.log($(".clsItem").eq(ind)[0]);
                            }else{
                                // console.log("inserted first");
                                $("#itemsWrapper").prepend($(v));
                            }
                        }
                    },true);
                }
            }
        }



    };

    // function to find the last priority item listed from start
    window.getLastPriorityItem = function(){
        var index = null;
        foreachin($(".clsItem"),function(k,v,i,l){
            if ($(v).data("priority") == true && $(v).next().data("priority") != true){
                index = i;
            }
        },true);
        return index;
    };

    // function to reset all functionalities of the application --------------------------
    window.destroyAll = function (){
        if (typeof window.loadingItemsInterval !== "null"){
            window.clearInterval(window.loadingItemsInterval);
            window.loadingItemsInterval = null;
        }

    };
    window.resetAll = function (){
        if ($(document).data("settings")["database"] != "" && $(document).data("settings")["database"].contains(",")){
            $("#itemsWrapper").css("background-image","url('images/preloader.gif')");
            window.totalItems = [];
            window.emptyWrapper = true;
            $(window).scrollTop(0);
            window.hideErrorMessage();
            emptyItemsWrapper();
            loadingItems();
            updateExtra();
            if (typeof window.loadingItemsInterval !== "null"){
                window.clearInterval(window.loadingItemsInterval);
            }
            window.loadingItemsInterval = window.setInterval(loadingItems,$(document).data("settings")['refresh'] * 1000);
            if (typeof window.updateExtraInverval !== "null"){
                window.clearInterval(window.updateExtraInverval);
            }
            window.updateExtraInverval = window.setInterval(window.updateExtra,$(document).data("settings")['refresh'] * 1000);



        }else{
            $("#itemsWrapper").css("background-image","none");
            showErrorMsg("No database found!");
        }
    };


});