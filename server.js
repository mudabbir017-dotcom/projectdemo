const express=require("express")
    const app=express();
app.set('view engine', 'ejs')
    app.get("/",(req,res)=>{
        fetch("https://jsonplaceholde.typicode.com/todos/1")
        .then(data=>data.json())
        .then(data=>{
            res.render(index.ejs,{todos:data})
        }).catch((err)=>{
            alert("error")
        })
    })
    app.listen(3000,console.log("Listning"))