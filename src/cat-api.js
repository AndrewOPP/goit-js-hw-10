import axios from "axios";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
axios.defaults.headers.common["x-api-key"] = "live_7RDzPZVITaKXebQj5w11AlfsRdPMlIRJaRlNIIamzjC8k9VB3dj1KORFVn8pIKrU";

const loader = document.querySelector(".loader")
const errorDiv = document.querySelector(".error")
const catDiv = document.querySelector(".cat-info")
const selection = document.querySelector(".breed-select")
loader.style.display = "none"
const cats = null
export function fetchBreeds() {
   loader.style.display = "block" 
  fetch("https://api.thecatapi.com/v1/breeds")
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
         }
    
    return response.json()
    
    })
      .then(data => {
        console.log(data);
        loader.style.display = "none"
        data.forEach(element => {
            const option = `<option value="${element.id}">${element.name}</option>`
            selection.insertAdjacentHTML("beforeend", option) 
        });

        new SlimSelect({
            select: '#cats'
        })

    })  
    
    .catch(error => {
        console.log(error);     
    })  
    
}

export function addCatInfo(event) {
        catDiv.setAttribute("hidden", "")
        loader.style.display = "block"
        const breed = event.target.value;
        fetch(`https://api.thecatapi.com/v1/images/search?api_key=breed_ids=${breed}`)
            
        .then(response => {
            if (!response.ok) {
                throw "Oops! Something went wrong! Try reloading the page!"
            }
            console.log(response);
            errorDiv.setAttribute("hidden", "")
            return response.json()
        })
            
            .then(data => {
            console.log(data);
            catDiv.innerHTML = ""
            const image = new Image();
            image.src = data[0].url;
            image.width =  700;
            image.height = 700;
            image.onload = function () {
                catDiv.appendChild(image);
                loader.style.display = "none";
        };

        catDiv.removeAttribute("hidden")

        }) 
            
        .catch(error => {
            errorDiv.innerHTML = error;
            errorDiv.style.color = "red"
            catDiv.setAttribute("hidden", "")
        })
    
}



