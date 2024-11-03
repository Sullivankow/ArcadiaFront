
/*Système de connexion*/
const mailInput = document.getElementById("Email-Input");
const passwordInput = document.getElementById("Password-Input");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");


btnSignin.addEventListener("click", checkCredentials);



//Vérifier mail et password//

function checkCredentials(){
    let dataForm = new FormData(signinForm);
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": dataForm.get("Username"),
        "password": dataForm.get("PassWord")
    });
    

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://127.0.0.1:8000/api/login", requestOptions)
    .then(response => {
        console.log("Réponse de l'API :", response);

        if(response.ok){
            return response.json();
        }
        else{
            mailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
        }
    })
    .then(result => {
        console.log("Résultat de l'API :", result);
        const token = result.apiToken;
        setToken(token);
        

        setCookie(RoleCookieName, result.roles[0], 7);
        window.location.replace("/menu-dashboard");
    })
    .catch(error => console.log('error', error));
}
