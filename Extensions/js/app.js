//#region Constantes
const ADD_LIST = "ADD_LIST";
const ADD_ELEMENT = "ADD_ELEMENT";
const DELETE_ELEMENT = "DELETE_ELEMENT";
const DELETE_LIST = "DELETE_LIST";
const EDIT_ELEMENT = "EDIT_ELEMENT";
const EDIT_LIST = "EDIT_LIST";
//#endregion

//#region Appels AJAX

    


    //Fonction d'inscription'
    function Register(){

        var login = $("#Register_login").val();
        var pswd = $("#Register_pswd").val();

        $.ajax({
            url: 'http://92.222.69.104/todo/create/' + login + '/' + pswd,
            dataType: 'json',
            success: function(data) {
                
            }
        });
    }

    //Fonction de connexion
    function Connexion(){

        var login = $("#Connect_login").val();
        var pswd = $("#Connect_pswd").val();

        $.ajax({
            url: "http://92.222.69.104/todo/listes",
            headers: 
            {
                "login" : login,
                "password": pswd
            }
        }).done(function(data) {
            Draw(data);
        });
    } 

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

//Retourne un flux JSON en fonction de l'action appellée
function GetFlux(data, action, index_List, index_Element){

    //Paramètres facultatif
    var index_List = index_List | null;
    var index_Element = index_Element | null;

    //Flux de retour avant traitement
    var sFlux = "";

    //Filtre en fonction de l'action demandée
    switch(action){

        //#region Ajout d'une liste
        case ADD_LIST:
                var sFluxList = "";
                var new_list =  prompt("Ajouter une Liste :");
                if(new_list != null){
                    for (let i = 0; i < data.todoListes.length; i++) {
                        if(i>0)
                            sFluxList += "," + JSON.stringify(data.todoListes[i]);
                        else
                            sFluxList += JSON.stringify(data.todoListes[i]);
                    }
                    sFluxList += ",{\"name\": \"" + new_list + "\",\"elements\":[]}";
                    sFlux = `{\"utilisateur\": \"`+ data.utilisateur +`\", \"password\": \"`+ data.password +`\", \"todoListes\": [` + sFluxList + `]}`;                
                }
        break;
        //#endregion

        //#region Suppression d'une liste
        case DELETE_LIST:
            data.todoListes.splice(index_List, 1);
            var sFlux = JSON.stringify(data);
        break;
        //#endregion

        //#region Modif d'une liste
        case EDIT_LIST:
            var new_titre = prompt("Nouveau titre :");
            if(new_titre == null || new_titre == ""){new_titre = data.todoListes[index_List].name}

            data.todoListes[index_List].name = new_titre;
            var sFlux = JSON.stringify(data);
        break;
        //#endregion

        
        //#region Ajout d'un élément 
        case ADD_ELEMENT:
                var sFluxList = "";
                var new_item = prompt("Nouvelle tâche :");
                if(new_item != null){
                    //Pour chaque liste
                    for (let i = 0; i < data.todoListes.length; i++) {
                        //Si i est égale à l'indice de la liste sélectionnée
                        if(i == index_List){
                            var item = data.todoListes[i].elements;
                            //Ajout du nouvel élément au tableau
                            item.push(new_item);
                            //Construction du flux
                            if(i>0){
                                sFluxList += ",{\"name\": \""+ data.todoListes[i].name +"\",\"elements\":"+ JSON.stringify(item) +"}";
                            }else{
                                sFluxList += "{\"name\": \""+ data.todoListes[i].name +"\",\"elements\":"+ JSON.stringify(item) +"}";
                            }
                        }else{
                            var item = data.todoListes[i].elements;
                            //Construction du flux
                            if(i>0){
                                sFluxList += ",{\"name\": \""+ data.todoListes[i].name +"\",\"elements\":"+ JSON.stringify(item) +"}";
                            }else{
                                sFluxList += "{\"name\": \""+ data.todoListes[i].name +"\",\"elements\":"+ JSON.stringify(item) +"}";
                            }
                        }
                    }
                    sFlux = `{\"utilisateur\": \"`+ data.utilisateur +`\", \"password\": \"`+ data.password +`\", \"todoListes\": [` + sFluxList + `]}`;
                }
        break;
        //#endregion    

        //#region Suppression d'un élément
        case DELETE_ELEMENT:

            data.todoListes[index_List].elements.splice(index_Element, 1);
            var sFlux = JSON.stringify(data); 

        break;
        //#endregion 
    
        //#region Modification d'un élément
        case EDIT_ELEMENT:

            var new_libelle = prompt("Nouveau libellé :");
            if(new_libelle == null || new_libelle == ""){new_libelle = data.todoListes[index_List].elements[index_Element]}
            data.todoListes[index_List].elements.splice(index_Element, 1, new_libelle);
            var sFlux = JSON.stringify(data); 

        break;
        //#endregion 
    
    }
    //Flux de retour après traitement
    return sFlux;
}

//Dessin du flux JSON
function Draw(data){
    var oMain = $("#main");
    oMain.empty();

    for (let n = 0; n < data.todoListes.length; n++) {
        
        //Conteneur global d'une todoList
        $("<div id='toDo-" + n.toString() + "' class='col-lg-3 col-md-4 col-sm-6'>").fadeIn( "slow" ).appendTo($("#main"));
        var oToDo = $("#toDo-" + n.toString());
        oToDo.draggable();
        
        //Création div List
        $("<div class='list-group m-2'>").appendTo(oToDo);
        var oList = oToDo[0].children;

        var oHeader = $("<span class='list-group-item text-center font-weight-bold bg-primary text-light'>"+ data.todoListes[n].name +"</span>").appendTo(oList);
        $("<span id='edit-"+ n +"' class='btn-edit'></span>").appendTo(oHeader);
        $("<span id ='del-"+ n +"'class='btn-delete'></span>").appendTo(oHeader);

        for (let i = 0; i < data.todoListes[n].elements.length; i++) {
            var item = data.todoListes[n].elements;

            //Correspond à un item
            var oElement = $("<div id='"+ n +"-"+ i +"' class='list-group-item list-group-item-action item'>" + item[i] + "</div>").appendTo(oList);
            $("<span id='edit-"+ n +"-"+ i +"' class='btn-edit'></span>").appendTo(oElement);
            $("<span id='remove-"+ n +"-"+ i +"' class='btn-remove'></span>").appendTo(oElement);

            
        }
        //Bouton ajouter 
        var oAjouter = $("<span id='add-"+ n +"' class='list-group-item list-group-item-action list-group-item-light text-center btn-add'></span>").appendTo(oList);
        
    }
    Draw_Empty();

    //Dessine le bouton permettant l'ajout d'une liste
    function Draw_Empty(){
        $("#Add").remove();
        $("<div id='Add' class='col-lg-3'>").appendTo($("#main"));
        var oAdd = $("#Add");

        var sHTML = "<div class='fixed-bottom'>"+
                        "<div class='scooter'></div>"+
                        "<span class='list-group-item list-group-item-action list-group-item-primary text-center btn-add'></span>"+
                    "</div>";
        var btnAdd = $(sHTML).appendTo(oAdd);
        init_events(data);
    }

}

//Fonction permettant d'initialiser tous les clicks utilisant le flux JSON
function init_events(data){
    //Sur le click du bouton d'ajout d'une liste
    $( "#Add" ).click(function() {
        Add_List(data);
    });


    
    //Gestion des clicks tools liste
    for (let i = 0; i < $("#main")[0].childElementCount; i++) {
        var oList = $("#main")[0].children[i];
        //ajout d'un élément
        $("#add-" + i).click(function() {
            Add_Element(data, i)
        });

        //Suppression d'une liste
        $("#del-" + i).click(function() {
            Remove_List(data, i)
        });

        //Suppression d'une liste
        $("#edit-" + i).click(function() {
            Edit_List(data, i);
        });

        for (let n = 0; n < $("#main")[0].children[i].children[0].children.length; n++) {
            var oElement = $("#main")[0].children[i].children[0].children[n];
            
            //Suppression d'un élément
            $("#remove-" + i + "-" + n).click(function() {
                Remove_Element(data,i,n);
            });

            //Modification d'un élément
            $("#edit-" + i + "-" + n).click(function() {
                Edit_Element(data,i,n);
            });
        }
    }
}

//Gestion de la navigation entre les écrans
function init_nav(){
    //Fermer l'inscription et affiche la connexion
    $("#btnRegister").click(function(){
        $("#Register").slideToggle();
        $("#Connect").slideToggle();
    });

    $("#btnBack").click(function(){
        $("#Register").slideToggle();
        $("#Connect").slideToggle();
        
    });

    $("#btnCreate").click(function(){
        $("#Connect").slideToggle();
        $("#Register").slideToggle();
    });


    $("#btnConnexion").click(function(){
        $("#Connect").slideToggle();
    });

}

//Fonction appellée à l'initialisation de la page
function init(){
    //Masque le formulaire d'inscription
    $("#Register").toggle();
    init_nav();
}




function LireHistoire(){

    $.ajax({
        url: "http://127.0.0.1:8080/histoire"
    }).done(function(data) {
        //Draw(data);
        for (let index = 0; index < data.length; index++) {
            
            Draw_Histoire(data[index]);
        }
        
    });
} 

function Draw_Histoire(sFlux){
    console.log(sFlux);
    

    var sHTML =  "<div class=\"card text-left\">"                                        
                +"   <img class=\"card-img-top\" src=\"holder.js/100px180/\" alt=\"\">"  
                +"    <div class=\"card-body\">"                                         
                +"        <h4 class=\"card-title\">" + sFlux.titre + "</h4>"             
                +"        <p class=\"card-text\">"+ sFlux.resume +"</p>"                 
                +"    </div>"                                                            
                +"</div>";
    $(sHTML).fadeIn( "fast" ).appendTo($("#main"));
}