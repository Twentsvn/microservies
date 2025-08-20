
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit' , async(event) =>{
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const apiKey = document.getElementById("apiKey").value;

    const formData = {
    userId : userId,
    apiKey : apiKey
    };

    try {
        const response = await fetch('/auth',{
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include"
        });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
    console.error("Login Failed: ", data.error);
    }
    

    } catch(error){
    console.error("Client-side error: ", error);
    }
});  

