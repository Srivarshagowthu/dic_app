const inp = document.getElementById('search');
const but = document.querySelector('button');
const resultdiv = document.getElementById('result');

let fun = async () => {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inp.value}`);
    let data = await response.json();
    resultdiv.innerHTML = '';

    if (data.title === 'No Definitions Found') {
        resultdiv.innerHTML = `<p>No definitions found for "${inp.value}".</p>`;
        return;
    }

    const word = data[0].word;
    resultdiv.innerHTML += `<h2 class="word">${word}</h2>`;

    if (data[0].phonetics.length > 0 && data[0].phonetics[0].audio) {
        const audio = data[0].phonetics[0].audio;
        resultdiv.innerHTML += `<audio controls>
                                    <source src="${audio}" type="audio/mpeg">
                                    Your browser does not support the audio element.
                                </audio>`;
    }

    for (let i = 0; i < data[0].meanings.length; i++) {
        const partofspeech = data[0].meanings[i].partOfSpeech;
        const definition = data[0].meanings[i].definitions[0].definition;
        const example = data[0].meanings[i].definitions[0].example || '';

        resultdiv.innerHTML += `
            <h3 class="partofspeech">${partofspeech}</h3>
            <h4 class="definition">${definition}</h4>
            <p class="example">${example}</p>
        `;
    }
};

but.addEventListener('click', fun);
