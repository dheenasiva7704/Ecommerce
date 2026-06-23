function login(){

    let email =
    document.getElementById("email").value;

    let password =
    document.getElementById("password").value;

    if(email === "" || password === ""){
        alert("Fill All Fields");
        return;
    }

    localStorage.setItem(
        "user",
        email
    );

    window.location.href =
    "index.html";
}