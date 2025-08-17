function validate (){
    var fname = document.getElementById("fname");
    var address = document.getElementById("address");
    var phone_num = document.getElementById("phone_num");

    if (fname.value.trim() == "" || address.value.trim() == "" || phone_num.value.trim() == ""){
        alert("Enter required data");
        return false;
    }
    else{
        return true;

    }
}