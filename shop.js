console.log('Ładuje plik sklepowy')


var shopInterval;
let cartQuantity = 0;
let sumaKoszyka = 0;
let new_balance_account = 0;
let confirmTransaction;

let productsAvailable = [];
let userChoose = [];

let queueOfOrders = [];
var timeOutDelivery = [];
let historyOfOrder = [];

function displayShop() {
    if (document.querySelector('.shop-div').innerText === ``) {
        let generatedDiv = `<div class="shop">
                            <table class="invoice-table">
                                <tr>`;

        let tableSwitch = 1;                        
        for (let i = 0; i < productsAvailable.length; i++) {
            generatedDiv += `  <th>
                                ${productsAvailable[i].nazwa}
                                    <br>
                                <img src="${productsAvailable[i].img}">
                                    <div class="price">${productsAvailable[i].cena}zł</div> 
                                        <button id="${productsAvailable[i].kodProduktu}" onclick="addCartQuantity(this.id)" type="button" class="btn btn-warning">
                                        Add to cart
                                        </button>
                                </th>`;
            if (tableSwitch % 3 == 0) {
                generatedDiv += `</tr><tr>`;
            }
            tableSwitch++;                
        };
        
        generatedDiv += `          </tr>
                                </table>
                                <div class="koszyk">           
                                        <button id="button-cart" onclick="showCart()" type="button" class="btn btn-success">
                                        0
                                        Koszyk
                                        </button>
                                        <button type="button" onclick="reset()" class="btn btn-danger">Anuluj</button>
                                    </div>
                                </div>`;

        document.querySelector('.shop-div').innerHTML = generatedDiv;   
    } else {
        console.log("Sklep wyświetlony")
    }

    gsap.fromTo('.shop-div', {y: -30, opacity: 0}, {y:0, opacity: 1, duration: 0.30});
}

function showCart() {
    let sumaCen = 0;
    let sumaPrzed = 0;

    let summary = `<div class="container">
                    <div class="row">
                        <div class="shop col-md-7 col-sm-12">
                            <h4>Wybrane przedmioty</h4>
                            <table class="invoice-table final-table">
                                <tbody>`;

    for (let i = 0; i < userChoose.length; i++) {
          sumaCen += userChoose[i].cena * userChoose[i].ilosc;
          sumaPrzed += userChoose[i].ilosc;
        summary += `
                        <tr> 
                            <td><img src="${userChoose[i].img}"></td>
                            <td>${userChoose[i].nazwa}</td>
                            <td>${userChoose[i].cena} zł</td>
                            <td>${userChoose[i].ilosc}</td>
                        </tr>`;
    }

    summary += `       </tbody>
                         <tfoot>
                             <tr>
                                 <td class="amountSign" colspan="2"><h4>Total - <h4></td>
                                 <td class="amountSign1"><h4>${sumaCen} zł</h4></td>
                                 <td class="amountSign2"><h4>${sumaPrzed}<h4></td>
                             </tr>
                         </tfoot>
                     </table> 
                    </div> 
                    <div class="sum-table col-md-5 col-sm-12 final-dev">
                      <form>
                         <div>
                            <h4>Sposób dostawy</h4>
                            <div>
                                <img class="delivery-img" src="https://www.jakimkurierem.pl/wp-content/uploads/2018/03/logo-dpd-kurier.jpg">
                                <img class="delivery-img" src="https://inpost.pl/sites/default/files/InPost_logotype_2019_white.png">
                                <img class="delivery-img" src="https://d2xhqqdaxyaju6.cloudfront.net/file/mediakit-s/1957618/6e/s-1200-630.jpg">
                            </div>
                        </div>
                        <div>
                            <h4>Płatność</h4>
                            <div>
                                <img class="delivery-img" src="https://jakdorobic.com/wp-content/uploads/2017/08/paypal-blog-1.png">
                                <img class="delivery-img" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Blik_logo.svg/800px-Blik_logo.svg.png">
                                <img class="delivery-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Mbank-logo.jpg/1200px-Mbank-logo.jpg">
                                <img class="delivery-img" src="https://www.fxmag.pl/images/cache/article_header_filter/images/articles/pko-bp-najwiekszy-bank-w-polsce-co-warto-wiedziec-o-pko-bp-pko-leasing-ipko-pko-junior-pko-logowanie.jpg">
                            </div>
                        </div>
                        <div>
                            <h4>Format potwierdzenia</h4>
                            <div>

                            
                                <input type="checkbox" onchange = "addAdditionalCompany()" name="pdf"> Faktura PDF
                                    <div class="NIP" style="display: none;"><div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="">NIP / KRS</span>
                                            </div>
                                        <input type="text" class="form-control" name="nip">
                                        <input type="text" class="form-control" id="krs">
                                    </div>
                                </div><br>


                                <input type="checkbox" name="excel"> Paragon Excel<br>
                                <input type="checkbox" name="email"> Paragon email
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" name="politics"> Akceptuje warunki polityki serwisu<br>

                        </div>
                        <div class="btn-check">
                            <button type="button" onclick="finalizuj()" class="btn btn-success">Zamawiam i płacę</button>
                        </div>
                      </form>
                    </div>
                 </div>`;              


    new_balance_account = sumaCen;             
    document.querySelector('.shop-div').innerHTML = summary;

    if (user.amount <= sumaCen) {
        document.querySelector(".amountSign").classList.add("notEnought");
        document.querySelector(".amountSign1").classList.add("notEnought");
        document.querySelector(".amountSign2").classList.add("notEnought");
        document.querySelector(".btn-check").innerHTML = `<button type="button" onclick="finalizuj()" class="btn btn-success" disabled>Zamawiam i płacę</button>`;
    } else {
        document.querySelector(".amountSign").classList.add("enought");
        document.querySelector(".amountSign1").classList.add("enought");
        document.querySelector(".amountSign2").classList.add("enought");
    }

    gsap.fromTo('.shop-div', {y: -30, opacity: 0}, {y:0, opacity: 1, duration: 0.30});
}

function addCartQuantity(id) {
    cartQuantity++;
    let shouldCheckNet = 0;

    document.getElementById("button-cart").innerHTML = `${cartQuantity} Koszyk`;

 

    for (let i = 0; i < userChoose.length; i++) {
        if (userChoose[i].kodProduktu == id) {
            userChoose[i].ilosc++;
            shouldCheckNet++;
        }
    }

    if (shouldCheckNet == 0) {
        for (let i = 0; i < productsAvailable.length; i++) {
    
            if (productsAvailable[i].kodProduktu == id) {
                sumaKoszyka += productsAvailable[i].cena;

                userChoose.push({nazwa: productsAvailable[i].nazwa,
                                img: productsAvailable[i].img,
                                cena: productsAvailable[i].cena,
                                kodProduktu: productsAvailable[i].kodProduktu,
                                ilosc: 1});
            }
        }
    }
    if (document.querySelector('.koszyk2').classList.contains('d-none')) {
        document.querySelector('.koszyk2').classList.remove('d-none');
        startTimer(1);
    }
    document.querySelector('#cartQuantu').innerText = `Koszyk ` + cartQuantity;
    gsap.fromTo('.purchase', {x: -10, opacity: 0}, {x: 0, opacity: 1});
    
}

function fillArrayWithProducts() {

    let laptop = {
        nazwa: "Lenovo",
        img: "https://img.lovepik.com/free-png/20220108/lovepik-laptop-png-image_401283536_wh860.png",
        cena: 3799,
        kodProduktu: 1
    }
    let Headphones = {
        nazwa: "Headphones",
        img: "https://e7.pngegg.com/pngimages/306/125/png-clipart-headphones-headphones.png",
        cena: 299,
        kodProduktu: 2
    }
    let Phone = {
        nazwa: "Lenovo",
        img: "https://static.vecteezy.com/system/resources/previews/008/850/474/original/3d-render-mobile-phone-png.png",
        cena: 2599,
        kodProduktu: 3
    }
    let Cable = {
        nazwa: "Cable",
        img: "https://assets.cdn.jula.com/w:828/Dmm3BWSV3/assetstream.aspx?assetId=170993&mediaformatid=50137&destinationid=10016&lastmodified=19790101000000",
        cena: 79,
        kodProduktu: 4
    }
    let Accessories = {
        nazwa: "Accessories",
        img: "https://e7.pngegg.com/pngimages/501/1005/png-clipart-iphone-5s-iphone-5c-iphone-6-plus-mobile-phone-accessories-phone-case-miscellaneous-gadget.png",
        cena: 15,
        kodProduktu: 5
    }
    let Other = {
        nazwa: "Other",
        img: "https://icons.veryicon.com/png/o/miscellaneous/icons-2/other-40.png",
        cena: 10,
        kodProduktu: 6
    }

    productsAvailable.push(laptop);
    productsAvailable.push(Headphones);
    productsAvailable.push(Phone);
    productsAvailable.push(Cable);
    productsAvailable.push(Accessories);
    productsAvailable.push(Other);


}

function increateQuantity(id, typeInc) {
    console.log(id + "   " + typeInc);

    for (let i = 0; i < userChoose.length; i++) {
        if (id == userChoose[i].kodProduktu) {
            
            if (typeInc === "up") 
                userChoose[i].ilosc++;
            if (typeInc === "down"  &&  userChoose[i].ilosc > 0) 
                userChoose[i].ilosc--;
        }  
    }

    showCart();
}

function reset() {
    document.querySelector('.shop-div').innerHTML = ``;
}

// function buyButton() {
//     console.log('Generuje PDFA');


//     // var docDefinition = {
//     //     content: [
//     //         {text:"Sklep RTV EURO AGD Poznań \n Growadzkiego 34A \n Zielona Góra \n Kod-pocztowy 23-123\n\n Dziękujemy za zakupy w naszym sklepie, ponizej wysyłamy fakture za zakupione produkty \n\n\n\n\n\n"},
//     //         {text: ""},
//     //         {text: "Lista zakupionych produktów - "},
//     //         {text: "----------------------------------------------------------------------------------------------------------------------------------------------------------"},
//     //         {text: generateInvoice()},
//     //     ],
//     //     defaultStyle: {
//     //     }
//     // };
//     // pdfMake.createPdf(docDefinition).print();
// }

// function generateInvoice() {
//     // let invoiceGenerated = ``;
//     // let suma = 0;

//     // for (let i = 0; i < userChoose.length; i++) {
//     //     invoiceGenerated += `Produkt -      ` + userChoose[i].nazwa + "  cena - " + userChoose[i].cena + "   Kod produktu - " + userChoose[i].kodProduktu + "\n";
//     //     suma += userChoose[i].cena;
//     // }

//     // invoiceGenerated += `\n\n\n\n\n\n`;
//     // invoiceGenerated += `Ilość przedmiotów - ` + cartQuantity + '\n';
//     // invoiceGenerated += `Łączna suma za wszystkie przedmioty - ` + suma + "zł";
    

//     // return invoiceGenerated;
// }

function generateExcel() {
    var data = [["Dziękujemy za zakupy i zapraszamy ponownie!"],
                        ["Tak", "Tak"]];

            var file = XLSX.utils.book_new();

            file.SheetNames.push("First");
            file.Sheets["First"] = XLSX.utils.aoa_to_sheet(generateTableForExcel());

            XLSX.writeFile(file, "file.xlsx")
            console.log('Pobieram plik xlsx');

}
function generateTableForExcel() {
    var data = [["Dziękujemy za zakupy i zapraszamy ponownie!"],];

    for (let i = 0; i < userChoose.length; i++) {
        data.push([userChoose[i].nazwa, userChoose[i].cena, userChoose[i].kodProduktu, userChoose[i].ilosc]);
    }
    data.push([]);
    data.push([]);
    data.push(["suma - ", sumaKoszyka, "zł"]);

    return data;
}
function generatePDF() {
    var doc = new jsPDF();
   

    let textProducts = ``;
    for (let i = 0; i < userChoose.length; i++) {
        textProducts += "Przedmiot: " + userChoose[i].nazwa + "\n" +      "kod produktu - " + userChoose[i].kodProduktu + "\n" + userChoose[i].cena + "zl\n\n";
    }

    doc.text('Dziekujemy za zamówienie, nizej przesylamy fakturę za zakupy' + "\n\n\n" + textProducts + "\n\n\n\n\n" + "Ilosc przedmiotow - " + cartQuantity + " sztuk\n" + "Laczna suma - " + sumaKoszyka + "zl", 10, 10);
    confirmTransaction = doc;
    /* FUNKCJA DRUKUJ/* CA*/
    doit(doc);
    doc.save('potwierdzenie.pdf');
}

function startTimer(duration) {
      var timer = duration * 3600;
    shopInterval = setInterval(function () {
      var hours = parseInt(timer / 3600, 10);
      var minutes = parseInt((timer % 3600) / 60, 10);
      var seconds = parseInt(timer % 60, 10);
  
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      document.querySelector('#timer').innerText = hours + ":" + minutes + ":" + seconds;
  
      if (--timer < 0) {
        timer = duration * 3600;
        userChoose = [];
        clearInterval(shopInterval);
      }
    }, 1000);
}
//ta funkcja byla w wywołana w buttonie funkcji showCart() jako onclick()
function finalizuj() {
    let shouldContinue = false;
    const form = document.querySelector('form');
    const data = new FormData(form);
    const politics = data.get('politics');

    if (politics == "on") {
        const pdf = data.get('pdf');
        const excel = data.get('excel');
        const email = data.get('email');

        if (excel == "on") {
            generateExcel();
        }
        if (pdf == "on") {
            const text = document.getElementById('nip').value;
            console.log(text);
            if (document.getElementById('nip').value !== ""  ||  document.getElementById('krs').value !== "") {
                generatePDF();
            }  else {
                alert("Przy próbie pobrania faktury wymagane jest podanie NIP lub KRS!");
            }
        }
        if (email == "on") {
            console.log('Wysyłam maila z potwierdzeniem');
        }

        const str = document.getElementById("amount").innerText;


        fetch('http://localhost:8080/fin/getAllFin')
                        .then((response) => response.json())
                        .then((data) => {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].id == person.balance_account) {

                                    let new_acc_data = data[i].balance - new_balance_account;
                                    document.querySelector('#amount').innerText = new_acc_data;
                                    
                                    if (new_balance_account <= data[i].balance) {
                                        fetch(`http://localhost:8080/api/getAccountBalance?id=${person.id}&newValue=${new_acc_data}`, {
                                            method: 'POST',
                                            body: null
                                          })
                                          .then(response => response.json())
                                          .then(data => console.log(data));

                                          shouldContinue = true;
                                    } else {
                                        console.log('Niewystarczająca ilość gotówki');
                                        alert("Nie masz wystarczająco środków na koncie");
                                    }
                                }
                            }
                        });

            setTimeout(function() {
                let orderHis = {
                    "numer" : historyOfOrder.length,
                    "dateOfOrder" : new Date(),
                    "items" : userChoose,
                    "suma" : sumaKoszyka,
                    "status" : 1,
                };
                historyOfOrder.push(orderHis);
    
                document.querySelector('.koszyk2').classList.add('d-none');
                queueOfOrders = userChoose;
                userChoose = [];
                productsAvailable = [];
                clearInterval(shopInterval);
                document.getElementById('timer').innerText = ``;
    
    
                document.querySelector('.shop-div').innerHTML = `
                        <div class="delivery">
                            <img id="dots" src="icons/Dots Loading.gif">
                        </div>    
                `;
                const tl = gsap.timeline({defaults: {duration: 0.60, ease: "power1.out"}});
    
                tl.fromTo('.delivery', {x: -10, opacity: 0}, {x: 0, opacity: 1});
                tl.fromTo('#dots', {x: -10, opacity: 0}, {x: 0, opacity: 1}, '<50%');
    
    
                setTimeout(function() {
                    document.querySelector('.delivery').innerHTML = `
                            <img id="transit" src="icons/In Transit.gif">   
                `;
                    gsap.fromTo('#transit', {x: -100, opacity: 0}, {x: 0, opacity: 1});
                    
    
                    setTimeout(function() {
                        const tl = gsap.timeline({defaults: {duration: 0.60, ease: "power1.out"}});
                        tl.fromTo('#transit', {x: 0, opacity: 1}, {x: 100, opacity: 0});
                        tl.fromTo('.delivery', {x: 0, opacity: 1}, {x: 20, opacity: 0}, '<40%');
                        
                    }, 1400);
                    setTimeout(function() {
                        document.querySelector('.delivery').innerHTML = ``;
                        document.querySelector('.shopLi').innerHTML = `
                        <div class="dropdown">
                        <img id="shopPhoto" src="icons/Shop.png">
                        <button class="functionButton btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sklep</button>
    
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            
                        <ul>
                            <li>
                                <button onclick="fillArrayWithProducts(), displayShop()" type="button" class="btn btn-link mx-3">Sklep</button>
                            </li>
                            <li>
                                <button onclick="deliveryOrder()" type="button" class="btn btn-link">W trakcie</button>
                            </li>
                            <li>
                                <button onclick="showHistoryOfOrders()" type="button" class="btn btn-link">Historia zakupów</button>
                            </li>
                        </ul>        
                            </div>            
                        </div>`;
    
                        gsap.fromTo('#shopPhoto', {y: -7}, {y: 0, yoyo: true, repeat: -1, duration: 0.45});
                        showHistoryOfOrders();
                    }, 2000)
                }, 2000)
            },1000)           
        } else {
            document.getElementsByName('politics')[0].checked = true;
        }
    


} 

function deliveryOrder() {
    let generateStart = `<div class="container">`;

    for (let i = 0; i < historyOfOrder.length; i++) {
        const stat = resturnStatusName(historyOfOrder[i].status);

        if (stat == "Nieopłacona"  ||  stat == "Opłacona") {
            generateStart += `<div class="row">
                            <div class="typeOfDev"> 
                                
                            </div>
                            <div>
                                <h6>Przesylka numer: ${historyOfOrder[i].numer}</h6>
                                <h6>Status: ${stat}</h6>
                            </div>
                        </div>`;
        }
        if (stat == "Przekazana do realizacji") {
            generateStart += `<div class="row">
                            <div class="typeOfDev"> 
                                <img src="icons/Delivered Box.gif">
                            </div>
                            <div>
                                <h6>Przesylka numer: ${historyOfOrder[i].numer}</h6>
                                <h6>Status: ${stat}</h6>
                            </div>
                        </div>`;
        } 
        if (stat == "Wysłana do magazynu") {
            generateStart += `<div class="row">
                            <div class="typeOfDev"> 
                                <img src="icons/Delivered Box.gif">
                                <span id="dots1">----------------</span>
                                <img id="warehouse" src="icons/Warehouse.gif">
                            </div>
                            <div>
                                <h6>Przesylka numer: ${historyOfOrder[i].numer}</h6>
                                <h6>Status: ${stat}</h6>
                            </div>
                        </div>`;

            // const tl = gsap.timeline({defaults: {duration: 0.18, ease: "power1.out"}});
            //    tl.fromTo('#dots1', {x: -20, opacity: 0}, {x: 0, opacity: 1});
            //    tl.fromTo('#warehouse', {x: -20, opacity: 0}, {x: 0, opacity: 1});


        }
        if (stat == "Wysłana do dostarczenia") {
            generateStart += `<div class="row">
                            <div class="typeOfDev"> 
                                <img src="icons/Delivered Box.gif">
                                <span>----------------</span>
                                <img src="icons/Warehouse.gif">
                                <span>----------------</span>
                                <img src="icons/Truck.gif">
                            </div>
                            <div>
                                <h6>Przesylka numer: ${historyOfOrder[i].numer}</h6>
                                <h6>Status: ${stat}</h6>
                            </div>
                        </div>`;

            // const tl = gsap.timeline({defaults: {duration: 0.18, ease: "power1.out"}});
            //    tl.fromTo('#dots1', {x: -20, opacity: 0}, {x: 0, opacity: 1});
            //    tl.fromTo('#warehouse', {x: -20, opacity: 0}, {x: 0, opacity: 1});


        }
    }

    generateStart += `</div`;
    document.querySelector('.others').innerHTML = generateStart;
    loadData();
}
 
function showHistoryOfOrders() {
    let start = `
    <div class="container">
                    <div class="row">
                        <div class="col-md-10">
                            <h5>Historia zakupów</h5>

                            <form method="POST" action="openpayu_php/examples/v2/order/OrderForm.php">
                                <input type="hidden" name="customerIp" value="127.0.0.1" />
                                <input type="hidden" name="merchantPosId" value="474896" />
                                <input type="hidden" name="description" value="New order" />
                                <input type="hidden" name="currencyCode" value="PLN" />
                                <input type="hidden" name="totalAmount" value="${(sumaKoszyka * cartQuantity) * 100}" />
                       
                            <table class="invoice-table">
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Produkty</th>
                                        <th>Suma</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>`;

    for (let i = 0; i < historyOfOrder.length; i++) {
            let products = ``;

            let status = ``;
            if (historyOfOrder[i].status == 1) 
                status = `Nieopłacona`;
            else if (historyOfOrder[i].status == 2) 
                status = `Opłacona`;
            else if (historyOfOrder[i].status == 3) 
                status = `Przekazana do realizacji`;
            else if (historyOfOrder[i].status == 4) 
                status = `Wysłana do magazynu`;
            else if (historyOfOrder[i].status == 5) 
                status = `Wysłana do dostarczenia`;

        for (let j = 0; j < historyOfOrder[i].items.length; j++) {
            products += historyOfOrder[i].items[j].nazwa + "\n";
        }
        //<td><button name="${i}" onclick="payForOrder(this.name)" type="button" class="btn btn-warning">Opłać</button></td>
        if (historyOfOrder[i].status == 1) {
            start += `    
                    <tr>
                        <td>${historyOfOrder[i].dateOfOrder.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                        <td>${products}</td>
                        <td>${historyOfOrder[i].suma}zł</td>
                        <td style="color: red;">${status}</td>
                        <td><input class="btn btn-warning" name="${i}" onclick="payForOrder(this.name)" type="submit" value="Opłać" disabled></td>
                        <td><input class="btn btn-success" type="submit" value="Opłać z PayU"></td>
                        <td><input class="btn btn-info" type="submit" onclick="doit(null)" value="Drukuj"></td>
                    </tr>`;
        } 
        
        else {
            start += `<tr>
                        <td>${historyOfOrder[i].dateOfOrder.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                        <td>${products}</td>
                        <td>${historyOfOrder[i].suma}zł</td>
                        <td style="color: green;">${status}</td>
                    </tr>`;
        }
    }
        start += `  </tbody>
                    </table>
                    </div>
                  </div>
                </form>
                </div>`;

    document.querySelector('.others').innerHTML = start;
}


//ta funkcja byla w onclick funkcji wyzej z dopiskiem this.name
function payForOrder(numberOfOrder) {
    console.log("Opłacam zamówienie - " + numberOfOrder);

        historyOfOrder[numberOfOrder].status++;
            let timer = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
            console.log(timer);

            timeOutDelivery.push(setTimeout(function() {
                processOrder(numberOfOrder);
                console.log("Pierwszy timer")
                    deliveryOrder();
            }, timer)); 
    
    showHistoryOfOrders();
}

function processOrder(numberOfOrder) {
            let timer = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
            console.log(timer);

            timeOutDelivery[numberOfOrder] = setTimeout(function() {
                historyOfOrder[numberOfOrder].status++;
                if (historyOfOrder[numberOfOrder].status > 5) 
                    historyOfOrder[numberOfOrder] = 5;
                
                deliveryOrder();
                console.log("Nowy timer")
                processOrder(numberOfOrder);
            }, timer); 
}

function resturnStatusName(number) {
    if (number == 1) 
        return "Nieopłacona";
    if (number == 2) 
        return "Opłacona";
    if (number == 3) 
        return "Przekazana do realizacji";
    if (number == 4) 
        return "Wysłana do magazynu";
    if (number >= 5) 
        return "Wysłana do dostarczenia";
    
}

function doit(PDF){
               
    console.log(PDF);
    if (PDF !== null) {
        window.print(PDF)
    } 
}

function addAdditionalCompany() {
    console.log("Pobieram niop");

    if (document.querySelector('.NIP').style.display === "none") {
        document.querySelector('.NIP').style = "inline";
        document.querySelector('.NIP').innerHTML = `<div class="input-group">
                                                        <div class="input-group-prepend">
                                                        <span class="input-group-text" id="">NIP / KRS</span>
                                                        </div>
                                                        <input type="text" class="form-control" id="nip">
                                                        <input type="text" class="form-control" id="krs">
                                                    </div>`;
    } else {
        document.querySelector('.NIP').innerHTML = ``;
        document.querySelector('.NIP').style.display = "none";
    }
}







