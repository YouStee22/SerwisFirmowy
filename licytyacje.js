fillArrayWithProducts();


var item;
var dataAukcji;

function displayLicytyacje() {
    const isActual = isLicytacja();

    let withoutUser = `Aktualna oferta`;
    if (item.user !== undefined) {
        withoutUser = `Oferta podbita przez ${item.user.name + " " + item.user.surname}`;
    }

    document.querySelector('.shop-div').innerHTML = `  <div class="container shop-con">
                                                        <div class="ended">ZAKOŃCZONE</div>
                                                        <div class="row">
                                                        <div class="col-md-6">
                                                            <span id="spanLicytyacje"><b>Licytacja Przedmiotu</b></span>
                                                            <div id="left">
                                                                ${item.nazwa}<br>
                                                                <img src="${item.img}" height="100px"><br>
                                                                ${Math.ceil(isActual[1])}h do końca
                                                                <br>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6" id="right">
                                                            <span>${withoutUser}</span><br>
                                                            <span>${item.cena} zł</span><br>
                                                            <span></span><br>
                                                        </div>
                                                            <div class="col-md-12">
                                                                Zblizenie oferty oznacza zawarcie wiązącej umowy. W przypadku wygranej zobowiązuje do zakupu przedmiotu.
                                                                <br>
                                                                    <button type="button" onclick="licytuj()" class="btn btn-danger btn-lg btn-block">Licytuj</button>
                                                                    <button type="button" onclick="document.querySelector('.shop-div').innerHTML = '';" class="btn btn-light btn-lg btn-block">Anuluj</button>

                                                            </div>
                                                        </div>
                                                    </div>`;


    if (!isActual[0]) {

        console.log('Tutaj podaj zakończenie licytacj');

        document.querySelector('.btn-danger').disabled = true;
        document.querySelector('.btn-danger').innerText = "Licytacja zakończona";
        document.querySelector('.ended').style.opacity = "1";
    }
}

function licytuj() {
    document.querySelector('.shop-div').innerHTML = `<div class="container">
                                                        <div class="row">
                                                        <div class="col-md-6>
                                                            <span id="spanLicytyacje"><b>Licytacja Przedmiotu</b></span>
                                                            <div id="leftSt1">
                                                                <span>${item.nazwa}</span><br>
                                                                <span>Aktualana cena - ${item.cena}zł</span><br>
                                                                <input id="yourOffer" type=number placeholder="Twoja oferta">
                                                                <br>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6" id="rightSt1">
                                                            <button type="button" onclick="licytujButton();" class="btn btn-danger btn-lg ">Licytuj</button>
                                                            <button type="button" onclick="displayLicytyacje();" class="btn btn-light btn-lg">Wróć</button>

                                                        </div>
                                                
                                                        </div>
                                                    </div>`;
}

function licytujButton() {
    let ammount = document.querySelector('#amount').innerHTML;
    let splitedAm = ammount.split('zł');

    let yourOff = document.querySelector('#yourOffer').value;

    console.log(yourOff + " "  + splitedAm[0] + "       " + yourOff + " " + item.cena);

    if ((yourOff <= splitedAm[0])  &&  (yourOff > item.cena)) {
        item.cena = yourOff;
        item.user = user;
        localStorage.setItem("licytacja", JSON.stringify(item));

        document.querySelector('.shop-div').innerHTML = ` <div class="alert alert-success" role="alert" style="width: 50%; margin: auto">
                                                            Udało się zalicytować przedmiot!
                                                        </div>`;
       
    } else {
        document.querySelector('.shop-div').innerHTML = ` <div class="alert alert-danger" role="alert" style="width: 50%; margin: auto">
                                                            Nie Udało się zalicytować przedmiotu!<br>
                                                            Twoja oferta jest za niska bądz nie masz tyle środków na koncie
                                                        </div>`;
       
        console.log("Twoja oferta jest za niska bądz nie masz tyle środków na koncie")
    }

    setTimeout(function() {
        location.reload();
    }, 3000)


}



function isLicytacja() {
    let array = [];

    if (localStorage.getItem("licytacja") === null) {
        dataAukcji = new Date();
        let atx = Math.floor(Math.random() * productsAvailable.length);

        while (atx == 3) {
            atx = Math.floor(Math.random() * productsAvailable.length);
        }
        item = productsAvailable[atx];

        dataAukcji.setDate(dataAukcji.getDate() + 2);
        item.data = dataAukcji;

        const date1 = new Date();
        const date2 = new Date(item.data);

        // Calculate the time difference in milliseconds
        const timeDiffInMilliseconds = date2 - date1;
        // Convert milliseconds to seconds
        const timeDiffInSeconds = timeDiffInMilliseconds / 1000;
        // Convert milliseconds to minutes
        const timeDiffInMinutes = timeDiffInMilliseconds / (1000 * 60);
        // Convert milliseconds to hours
        const timeDiffInHours = timeDiffInMilliseconds / (1000 * 60 * 60);

        array[1] = timeDiffInHours;
        
        localStorage.setItem("licytacja", JSON.stringify(item));
        array[0] = true;
    } else {
        item = JSON.parse(localStorage.getItem("licytacja"));
    
        const date1 = new Date();
        const date2 = new Date(item.data);

        // Calculate the time difference in milliseconds
        const timeDiffInMilliseconds = date2 - date1;
        // Convert milliseconds to seconds
        const timeDiffInSeconds = timeDiffInMilliseconds / 1000;
        // Convert milliseconds to minutes
        const timeDiffInMinutes = timeDiffInMilliseconds / (1000 * 60);
        // Convert milliseconds to hours
        const timeDiffInHours = timeDiffInMilliseconds / (1000 * 60 * 60);

        array[1] = timeDiffInHours;
;
        if (new Date(item.data) < new Date()) {
            array[0] = false;
            // return false;
        } else {
            console.log("Licytacja trwa")
            array[0] = true;
        }
        console.log(array);
    }
    return array;


}