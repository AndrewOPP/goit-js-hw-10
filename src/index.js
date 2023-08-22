import axios from "axios";
import {fetchBreeds, addCatInfo} from "./cat-api"
// import SlimSelect from 'slim-select'
// import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common["x-api-key"] = "live_7RDzPZVITaKXebQj5w11AlfsRdPMlIRJaRlNIIamzjC8k9VB3dj1KORFVn8pIKrU";

const selection = document.querySelector(".breed-select")

fetchBreeds()

selection.addEventListener("change", addCatInfo);