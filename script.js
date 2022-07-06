const app = {};
app.horoscopeResult = $('.horoscopeResult');
app.horoscopeSection = $('.horoscopeSection');
app.goToMainSection = $('.goToMainSection');
app.backToSubmit = $('.backToSubmit');


app.goToMainSection.on('click', function() {
    $('#selection')[0].scrollIntoView();
}); 

app.backToSubmit.on('click', function() {
    $('#selection')[0].scrollIntoView();
}); 


app.getUserSelection = (sign, day) => {
    let horoscopeDescription; 
    let luckyNumber;
    $.ajax({
        url: `https://aztro.sameerkumar.website?sign=${sign}&day=${day}`,
        method: "POST",
        dataType: "json",
        success:function(data){
            horoscopeDescription = data.description;
            luckyNumber = data.lucky_number;
            day = data.current_date;
            compatibleSign = data.compatibility;
            }
    }).then(result => {
        const htmlToAdd = `
            <div class="horoscopeHtml"> 
                <img src="./assets/image${sign}.png"/>
                    <div>
                        <div class="horoscopeAndNumber">
                            <h3> Your ${sign} Horoscope for ${day}</h3>
                            <p>${horoscopeDescription} Your lucky number is ${luckyNumber} and you are compatible with ${compatibleSign}.</p>
                        </div>
                        <div class="anotherHoroscope">
                            <a href="#selection">
                                Get Another Horoscope
                            </a>
                        </div>
                    </div>
                <img src="./assets/image${sign}.png"/>
            </div>
            `;
        app.horoscopeResult.html(htmlToAdd);
        const userSign = $('#signSelection').val();
        if (userSign === "Aries" || userSign === "Leo" || userSign === "Sagittarius") {
            app.horoscopeSection.removeClass('horoscopeSection');
            app.horoscopeSection.removeClass('earthSign');
            app.horoscopeSection.removeClass('airSign');
            app.horoscopeSection.removeClass('waterSign');
            app.horoscopeSection.addClass('fireSign');
        } else if (userSign === "Taurus" || userSign === "Virgo" || userSign === "Capricorn") {
            app.horoscopeSection.removeClass('horoscopeSection');
            app.horoscopeSection.removeClass('airSign');
            app.horoscopeSection.removeClass('waterSign');
            app.horoscopeSection.removeClass('fireSign');
            app.horoscopeSection.addClass('earthSign');
        } else if (userSign === "Gemini" || userSign === "Libra" || userSign === "Aquarius") {
            app.horoscopeSection.removeClass('horoscopeSection');
            app.horoscopeSection.removeClass('fireSign');
            app.horoscopeSection.removeClass('waterSign');
            app.horoscopeSection.removeClass('earthSign');
            app.horoscopeSection.addClass('airSign');
        } else if (userSign === "Cancer" || userSign === "Scorpio" || userSign === "Pisces") {
            app.horoscopeSection.removeClass('horoscopeSection');
            app.horoscopeSection.removeClass('fireSign');
            app.horoscopeSection.removeClass('earthSign');
            app.horoscopeSection.removeClass('airSign');
            app.horoscopeSection.addClass('waterSign');
        }   
        
    });

};



app.setFormSubmit = function() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        const selectedDay = $('#daySelection').val();
        const userSign = $('#signSelection').val();
        app.getUserSelection(userSign, selectedDay);
        $('#horoscopeId')[0].scrollIntoView();
        console.log(userSign);
    });
};


app.emptySelection = function() {
    app.horoscopeResult.on('click', function () {
        $('select').val('');
        app.horoscopeResult.html(`<a href="#selection">
            Go Back Up to Submit Selections
            </a>`);
    });
    
};


app.init = function() {
    app.setFormSubmit();
    app.emptySelection();
    
};


$(document).ready(function () {
    app.init();
});

