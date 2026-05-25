function validateRegistration(){
     let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let confirm = document.getElementById("confirm").value;

      if(name.trim()=="" || email.trim()=="" || password.trim()=="" || confirm.trim()==""){
        alert("fileds are empty");
      }
      if(!email.includes("@")){
        alert("enter valid email");
        return false;
      }
      if(password!=confirm){
        alert("Enter password correctly");
        return false;
      }
      alert("Regirstration successfull");
      return true;
}