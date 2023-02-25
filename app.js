const listPokemons = document.getElementById('lists_pokemons');
const buttons = document.getElementById('buttons');
let urlPokemon = 'https://pokeapi.co/api/v2/pokemon';
let btnNext;
let btnPrevious;
let templateHtml;





const fetchPokemon =async (url)=>{
    try{
        const resp = await fetch(url)
        const results = await resp.json();
        console.log(results);
        dataPokemons(results.results);

        btnNext = results.next ? `<img src = ${'img/next.svg'} class = 'btn' data-url = ${results.next}>` : ''
        btnPrevious = results.previous ? `<img src = ${'img/previous.svg'} class = 'btn' data-url = ${results.previous}>` : ''
        buttons.innerHTML = btnPrevious +' '+ btnNext


    }catch (error){
        console.log(error);
    }
};


fetchPokemon(urlPokemon);

const dataPokemons =async (data) =>{
    listPokemons.innerHTML ='';
    try{ 
        for(let index of data){
            const response = await fetch(index.url)
            const result = await response.json();
            console.log(result)
            templateHtml = `
            <div class ='pokemon__img'>
            <img src= ${result.sprites.other.dream_world.front_default} alt = ${result.name}/>
            <p> ${result.name} </p>
            </div>`
            listPokemons.innerHTML += templateHtml;
            
        }
    }catch (error){
        console.log(error);
    }
}

buttons.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btn')){
        let value = e.target.dataset.url
        console.log(value)
        
        fetchPokemon(value);
    }
})



