


/*Système de connexion*/
const mailInput = document.getElementById("Email-Input");
const passwordInput = document.getElementById("Password-Input");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");


btnSignin.addEventListener("click", checkCredentials);


//Fonction pour vérifier les informations
async function checkCredentials() { // 1. Ajout du mot-clé `async` pour transformer la fonction en fonction asynchrone.
    try {
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

        
        const response = await fetch(`${apiUrl}/login`, requestOptions);

        console.log("Réponse de l'API :", response);

        // Ajout d'une condition pour vérifier si la réponse est invalide. On lève une erreur manuellement si c'est le cas.
        if (!response.ok) {
            mailInput.classList.add("is-invalid"); // Ajout des classes pour signaler les champs invalides.
            passwordInput.classList.add("is-invalid");
            throw new Error("Login failed. Vérifiez vos identifiants."); // Lève une erreur pour être capturée dans le bloc `catch`.
        }

        
        const result = await response.json();
        console.log("Résultat de l'API :", result);

        //extraction du token et redirection après connexion réussie.
        const token = result.apiToken;
        setToken(token);

        setCookie(RoleCookieName, result.roles[0], 7); // Enregistre le rôle dans un cookie.
        window.location.replace("/menu-dashboard"); // Redirige l'utilisateur connecté.
    } catch (error) {
        // 5. Bloc `catch` ajouté pour capturer toutes les erreurs et les loguer.
        console.error("Erreur :", error);
    }
}







