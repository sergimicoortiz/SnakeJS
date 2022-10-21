import axios from "axios";


//Function tat use the pokeapi to get the user image
async function getUserImg() {
    try {
        const min = 1; //The min value for the random
        const max = 905; //The max value for the random, the number of pokemons in the api
        const id = Math.floor(Math.random() * (max - min)) + min; //A random number that will be used as the pokemon id
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await axios.get(URL);
        if (response.status === 200) {
            const img = response.data.sprites.front_default;
            return img;
        }
    } catch (error) {
        console.error(error);
    }
    return '';
}//getUserImg

export default getUserImg