function greett(name){
    return this.name=name;
}
greett.prototype.person=()=>{
    console.log(`${name}`)
}
const p1=new greett("Hasan")
p1.person();