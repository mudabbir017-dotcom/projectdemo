const task=document.getElementById("task");
const lis=document.getElementById("lis");
function addtask(){
    if(task.value===''){
        alert("Enter something");
    }
    else{
        let li=document.createElement("li");
        li.innerHTML=task.value;
        lis.appendChild(li);
    }
    let btn=document.createElement("button");
    btn.textContent="❌";
    btn.onclick=function(){
        lis.removeChild(btn);
    }
    task.value=" ";
    
}