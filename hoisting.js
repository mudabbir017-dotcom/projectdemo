//All the declaration are hoisted upwards before the code execution
document.writeln(a)
greet()
function greet(){
    document.writeln("Hi")
}
var a=9;
document.writeln(a)