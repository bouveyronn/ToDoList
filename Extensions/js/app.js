//#region Constantes
const API_URL = "http://127.0.0.1:8080"
//#endregion

//#region Appels AJAX

    //Ajout d'une liste
    function Add_List(data){   
        $.ajax({
            type: 'post',
            data: GetFlux(data, ADD_LIST),
            contentType: "application/json; charset=utf-8",
            url: "http://92.222.69.104/todo/listes"
            }).done(function(response) {
                Draw(response);
        });
    }

    //Suppression d'une liste
    function Remove_List(data, index_List){
        $.ajax({
            type: 'post',
            data: GetFlux(data,DELETE_LIST,index_List),
            contentType: "application/json; charset=utf-8",
            url: "http://92.222.69.104/todo/listes"
            }).done(function(response) {
                Draw(response);
        });
    }

    //Modif d'une liste
    function Edit_List(data, index_List){
        $.ajax({
            type: 'post',
            data: GetFlux(data,EDIT_LIST,index_List),
            contentType: "application/json; charset=utf-8",
            url: "http://92.222.69.104/todo/listes"
            }).done(function(response) {
                Draw(response);
        });
    }

    //Ajout d'un élément dans une liste
    function Add_Element(data, index_List){    
        $.ajax({
            type: 'post',
            data: GetFlux(data,ADD_ELEMENT,index_List),
            contentType: "application/json; charset=utf-8",
            url: "http://92.222.69.104/todo/listes"
            }).done(function(response) {
                Draw(response);
        });
    }

    //Suppression d'un élément dans une liste
    function Remove_Element(data, index_List, index_Element){    
        $.ajax({
            type: 'post',
            data: GetFlux(data,DELETE_ELEMENT,index_List, index_Element),
            contentType: "application/json; charset=utf-8",
            url: "http://92.222.69.104/todo/listes"
            }).done(function(response) {
                Draw(response);
        });
    }
    
    //Modif d'un élément dans une liste
    function Edit_Element(data, index_List, index_Element){    
        $.ajax({
            type: 'post',
            data: GetFlux(data,EDIT_ELEMENT,index_List, index_Element),
            contentType: "application/json; charset=utf-8",
            url: "http://92.222.69.104/todo/listes"
            }).done(function(response) {
                Draw(response);
        });
    }
//#endregion

function LireHistoire(){

    $.ajax({
        url: API_URL + "/histoire"
    }).done(function(data) {
        for (let index = 0; index < data.length; index++) {
            Draw_Histoire(data[index], index);
        }
    }).fail(function(err) {
        if(!err.readyState){
            alert("Connecion échoué")
        }else{
            alert(err.responseText);
        }
    });
} 

function Search_Histoire(){
    var sSearch = $("#search").val();
    $.ajax({
        url: API_URL + "/histoire?q=" + sSearch
    }).done(function(data) {
        $("#main").empty();
        for (let index = 0; index < data.length; index++) {
            Draw_Histoire(data[index], index);
        }
    }).fail(function(err){
        alert(err.responseText);
    });
} 

function Draw_Histoire(sFlux, index){
    var sHTML =  "<div id=\"" + sFlux.id + "\"class=\" col-lg-3 col-md-6 col-12\">"                                        
                +"   <img class=\"card-img-top\" src=\""+ sFlux.image +"\">"  
                +"   <div class=\"bg-play ml-0 mr-0 m-auto\"></div>" 
                +"    <div class=\"card-body\">"                                         
                +"        <h4 class=\"card-title\">" + sFlux.titre + "</h4>" 
                +"    </div>"      
                +"        <p class=\"card-text\">" + sFlux.resume + "</p>"                                                   
                +"</div>";
    var oHistoire = $(sHTML).fadeIn( "slow" ).appendTo($("#main"));
    init_events(oHistoire,"HISTOIRE");
}

function  init_events(oDOM, action) {
    
    switch (action) {
        case "HISTOIRE":
            oDOM.click(function() {
                var panel = oDOM.children().last();
                panel.slideToggle();
            });
            break;
    
        case "ETAPE":
        
        break;

        default:
            alert("coucou");
            break;
    }
}