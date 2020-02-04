var buttons=document.getElementsByClassName("button");
var display=document.getElementById("display-text");
var operand1=0;
var operand2=null;
var operator=null;
var evaluated = false;


function isOperator(value){
    return value=="+" || value=="-" || value =="*" || value=="/";
}


function result(value){
    var text=display.textContent.trim();
    if(isOperator(value)){
        operator=value;
        operand1=parseFloat(text);
        display.textContent="";
    }
    else if(value=="AC" || value=="Delete"){
    display.textContent="";
    }
    else if(value=="Backspace"){
        if(text.length){
            var current=parseFloat(text);
            display.textContent=display.textContent.slice(0, -1);
        }
    }
    else if(value=="sign"){
        if(text.length){
            operand1=parseFloat(text);
            operand1=(-1)*operand1;
            display.textContent=operand1;
        }
    }
    else if(value=="."){
        if(text.length && !text.includes('.')){
            display.textContent=text + '.';
        }
    }
    else if(value=="%"){
        if(text.length){
            operand1=parseFloat(text);
            operand1=operand1/100;
            display.textContent=operand1;
        }
    }
    else if(value=="=" || value=="Enter"){
        operand2=parseFloat(text);
        var result=eval(operand1+' '+operator+' '+operand2);
        if(result){
            display.textContent=result;
            operand1=result;
            operand2=null;
            operator=null;
        }
    }
    else{
        display.textContent+=value;
    }
}

// for buttons event
for(var i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click',function(){
        
    var value= this.getAttribute('data-value');
    result(value);
    });
}


// for keyboard key event
document.addEventListener("keydown", function (event) {
    var keyValue = event.key;
    if((keyValue>=0 && keyValue<=9) || keyValue=="/" || keyValue=="*" || keyValue=="+" || keyValue=="-" ||
    keyValue=="Enter" || keyValue=="Backspace" || keyValue=="%" || keyValue=="=" || keyValue=="." || keyValue=="Delete")
        result(keyValue);
});
