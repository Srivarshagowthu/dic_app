var inp = document.getElementById('search');
var but = document.querySelector('button');
var resultdiv = document.getElementById('result');
let fun = async () => {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inp.value}`);
    let data = await response.json();
    const word = data[0].word;
    const audio = data[0].phonetics[0].audio;
    resultdiv.innerHTML = `
        <h2 class="word">${word}</h2>
        `;
    for (let i = 0; i < data[0].meanings.length; i++) {
        const partofspeech = data[0].meanings[i].partOfSpeech;
        const definition = data[0].meanings[i].definitions[0].definition;
        const example = data[0].meanings[i].definitions[0].example;
        resultdiv.innerHTML += `
            <h3 class="partofspeech">${partofspeech}</h3>
            <h4 class="definition">${definition}</p>
            <p class="example">${example}</p>
            `;
    }
    
}

but.addEventListener('click', fun);
