const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('theQuote');
const authorText = document.getElementById('theAuthor');
const twitterBtn = document.getElementById('twitter');
const newBtn = document.getElementById('new-quote');
const animatedObjects = document.getElementsByClassName('animated');
const quoteImage = document.getElementById('theImage');
const mainDiv = document.getElementById('mainContent');
//let jsonQuotes = [];

// New Quote

function newQuote() {
    let randomIndex = Math.floor(Math.random() * jsonQuotes.length);
    const quote = jsonQuotes[randomIndex];
    animatedObjects[0].classList.add('loading');
    animatedObjects[1].classList.add('loading');
    window.setTimeout(function () {
        authorText.textContent = quote.author;
        quoteText.textContent = quote.text;
        if (quote.image) {
            quoteImage.setAttribute('src', 'images/' + quote.image);
        }
        else {
            quoteImage.setAttribute('src', 'images/default.gif');

        }
        // Check quote length for css
        if (quote.text.length > 150) {
            quoteText.classList.add('long-quote')
        }
        else {
            quoteText.classList.remove('long-quote')

        }

        window.setTimeout(function () {
            animatedObjects[0].classList.remove('loading');
            animatedObjects[1].classList.remove('loading');
        }, 500
        );

    }, 380
    );
}

function firstQuoteLoader(firstQuote) {
    console.log(firstQuote.image + ' first loaded');
        authorText.textContent = firstQuote.author;
        quoteText.textContent = firstQuote.text;
        // Check quote length for css
        if (firstQuote.text.length > 150) {
            quoteText.classList.add('long-quote')
        }
        else {
            quoteText.classList.remove('long-quote')

        }
        mainDiv.style.opacity=1;
        window.setTimeout(function () {
            animatedObjects[0].classList.remove('loading');
            animatedObjects[1].classList.remove('loading');
        }, 500
        );
        quoteImage.removeEventListener('onload', firstQuoteLoader);
}

function firstQuote() {
    let randomIndex = Math.floor(Math.random() * jsonQuotes.length);
    let firstQuote = jsonQuotes[randomIndex];
    quoteImage.addEventListener('onload', firstQuoteLoader(firstQuote));
    if (firstQuote.image) {
        preloadImage('images/' + firstQuote.image);
        quoteImage.setAttribute('src', 'images/' + firstQuote.image);
    }
    else {
        quoteImage.setAttribute('src', 'images/default.gif');
    }
}

//On Load:
//newQuote();


//Preload images for smoother transitions
async function preLoadImages() {
    let loadedImages=[];
    for (let i = 0; i < jsonQuotes.length; i++) {
        if (jsonQuotes[i].image && jsonQuotes[i].image != 'undefined' && !loadedImages.includes(jsonQuotes[i].image)) {
            loadedImages.push(jsonQuotes[i].image);
            preloadImage('images/' + jsonQuotes[i].image);
            console.log(jsonQuotes[i].image + ' loaded');
        }
    }
}

function preloadImage(url) {
    let img = new Image();
    img.src = url;
}



//Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners:

newBtn.addEventListener('click', newQuote);


twitterBtn.addEventListener('click', tweetQuote);


window.addEventListener('load', firstQuote);


window.addEventListener('load', preLoadImages);