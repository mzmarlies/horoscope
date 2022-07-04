console.log('connected')

const app = {};

// array of the signs:
app.signs = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
]

// get API response:
app.getSignInfo = (sign) => {
    const URL = `https://aztro.sameerkumar.website/?sign=${sign}&day=today`;
    fetch( URL, {
        method: 'POST'
    }).then((response) => response.json())
    .then(json => {
        // app.dropdownList(json)
        app.signs = json;
        
    })
}

// populate the list:
app.dropdownSigns = () => {
    document.querySelector('.signSelect').innerHTML = '';
    
    const dropdown = document.querySelector('select');

    app.signs.forEach((singleSign) => {
        const optionElement = document.createElement('input');

        optionElement.value = singleSign;
        optionElement.innerHTML = singleSign;

        console.log(singleSign)

        dropdown.appendChild(optionElement)
    })
}

//Show user's selection:
app.userSelectedSign = () => {
    const selectElement = document.querySelector('.signSelect');
    selectElement.addEventListener('change', function(event){
        event.preventDefault();

        document.querySelector('.horoscopeResult').innerHTML = '';
        // document.querySelector('.results').innerHTML = '';

        const userSelection = this.value;
        console.log(userSelection)
        
        // make a div for the sign selected:
        const heading = document.createElement('h2');
        heading.innerText = userSelection;
        document.querySelector('.results').appendChild(heading)

        const selectedSign = app.signs.filter((sign) => {
            return userSelection;
        })[0]

        let { description, current_date, lucky_number, compatibility } = selectedSign;

        const newHoroscope = document.querySelector('.results');
        newHoroscope.innerHTML = `
            <div class="horoscopeHtml">
                <div class="horoscopeResult">
                    <h3>${userSelection} Horoscope for ${current_date}</h3>
                    <p>${description} Your lucky number for this day is ${lucky_number} and you are compatible with ${compatibility}.</p>
                </div>
                <div class="anotherHoroscope">
                    <a href="#selection">Get Another Horoscope</a>
                </div>
            </div>
        `

        document.querySelector('.results').appendChild(newHoroscope)
    })
}


// app.getUserInput = () => {}
// app.submitResults = () => {}


app.init = () => {
    app.getSignInfo();
    //    app.getUserInput();
    app.dropdownSigns();
    app.userSelectedSign();
    // app.submitResults();
}

app.init();

// // const sign = document.querySelector('option');
        // const horoscopeDescription = json.description;
        // const luckyNumber = json.lucky_number;
        // const date = json.current_date;
        // const compatibility = json.compatibility;

        // console.log(horoscopeDescription, luckyNumber, date, compatibility);
        
        // const newHoroscope = document.querySelector('.results');
        // newHoroscope.innerHTML = `
        //     <div class="horoscopeHtml">
        //         <div class="horoscopeResult">
        //             <h3>${sign} Horoscope for ${date}</h3>
        //             <p>${horoscopeDescription} Your lucky number for this day is ${luckyNumber} and you are compatible with ${compatibility}.</p>
        //         </div>
        //         <div class="anotherHoroscope">
        //             <a href="#selection">Get Another Horoscope</a>
        //         </div>
        //     </div>
        // `
        
        
        // const htmlToAdd = 
        // `
        //     <div class="horoscopeHtml">
        //         <div class="horoscopeResult">
        //             <h3>{sign}</h3>
        //             <p>{horoscopeDescription}. Your lucky number for this day is {luckyNumber} and you are compatible with {compatibility}.</p>
        //         </div>
        //         <div class="anotherHoroscope">
        //             <a href="#selection">Get Another Horoscope</a>
        //         </div>
        //     </div>
        // `
        
        
        // document.querySelector('.submitButton').addEventListener('submit', function(){
    //     document.querySelector('.results').textContent = '';

    //     const userSignSelection = this.value;
    //     app.getSignInfo(userSignSelection);

    //     console.log(userSignSelection)
    // })
    
    
    // const submitBtn = document.querySelector('.submitButton');
    // const signSelect = document.querySelector('.signSelect');
    // const daySelect = document.querySelector('.daySelect')
    // submitBtn.addEventListener('submit', function(event){
    //     event.preventDefault();
    //     const userSign = event.signSelect.value;
    //     const userDay = event.daySelect.value;
    //     app.getUserSelection(userSign, userDay);
    //     console.log(userSign)
    // })