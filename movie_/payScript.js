let tColorA = document.getElementById('tColorA'),
    tColorB = document.getElementById('tColorB'),
    tColorC = document.getElementById('tColorC'),
    iconA = document.querySelector('.fa-credit-card'),
    iconB = document.querySelector('.fa-building-columns'),
    iconC = document.querySelector('.fa-wallet'),
    cDetails = document.querySelector('.card-details');


function doFun() {
    tColorA.style.color = "greenyellow";
    tColorB.style.color = "#444";
    tColorC.style.color = "#444";
    iconA.style.color = "greenyellow";
    iconB.style.color = "#aaa";
    iconC.style.color = "#aaa";
    cDetails.style.display = "block";
}

function doFunA() {
    tColorA.style.color = "#444";
    tColorB.style.color = "greenyellow";
    tColorC.style.color = "#444";
    iconA.style.color = "#aaa";
    iconB.style.color = "greenyellow";
    iconC.style.color = "#aaa";
    cDetails.style.display = "none";
}

function doFunB() {
    tColorA.style.color = "#444";
    tColorB.style.color = "#444";
    tColorC.style.color = "greenyellow";
    iconA.style.color = "#aaa";
    iconB.style.color = "#aaa";
    iconC.style.color = "greenyellow";
    cDetails.style.display = "none";
}

let cNumber = document.getElementById('number');
let isRed = false;

cNumber.addEventListener('keyup', function(e) {
    let num = cNumber.value;

    let newValue = '';
    num = num.replace(/\s/g, '');
    for (var i = 0; i < num.length; i++) {
        if (i % 4 == 0 && i > 0) newValue = newValue.concat(' ');
        newValue = newValue.concat(num[i]);
    }
    cNumber.value = newValue;
    
    if(num.length < 16) {
        cNumber.style.border = "1px solid red";
        isRed = true;
    } else {
        cNumber.style.border = "1px solid greenyellow";
        isRed = false;
    }
});

cNumber.addEventListener('blur', function() {
    if (!isRed) {
        cNumber.style.border = "";
    }
});


let eDate = document.getElementById('e-date');
let isRed_ = false;

eDate.addEventListener('input', function(e) {
    let newInput = eDate.value;

    if (e.inputType !== 'delete') {
        if (newInput.length === 2 && e.inputType !== 'delete') {
            newInput += '/';
            eDate.value = newInput;
        }
    }

    let parts = newInput.split('/');
    let month = parseInt(parts[0], 10);
    let year = parseInt(parts[1], 10);

    if ((year === 23 && !(month === 11 || month === 12)) || year < 23) {
        eDate.style.border = "1px solid red";
        isRed_ = true;
    } else {
        eDate.style.border = "1px solid greenyellow";
        isRed_ = false;
    }
});

eDate.addEventListener('blur', function() {
    if (!isRed_) { 
        eDate.style.border = ""; 
    }
});

let cvvInput = document.getElementById('cvv');
let cvvIsRed = false;

cvvInput.addEventListener('input', function() {
    let cvv = cvvInput.value.trim();

    if (cvv.length === 3 && !isNaN(cvv)) {
        cvvInput.style.border = "1px solid greenyellow";
        cvvIsRed = false;
    } else {
        cvvInput.style.border = "1px solid red";
        cvvIsRed = true;
    }
});

cvvInput.addEventListener('blur', function() {
    if (!cvvIsRed) {
        cvvInput.style.border = "";
    }
});

let cardholderNameInput = document.getElementById('cardholdername');
let cardholderNameIsRed = false;

cardholderNameInput.addEventListener('input', function() {
    let cardholderName = cardholderNameInput.value.trim();

    if (/^\d+$/.test(cardholderName)) {
        cardholderNameInput.setCustomValidity("Lütfen sadece metin giriniz.");
        cardholderNameInput.reportValidity();
    } else {
        cardholderNameInput.setCustomValidity("");
    }

    if (cardholderName.length >= 1 && cardholderName.length <= 32) {
        cardholderNameInput.style.border = "1px solid greenyellow";
        cardholderNameIsRed = false;
    } else {
        cardholderNameInput.style.border = "1px solid red";
        cardholderNameIsRed = true;
    }
});

cardholderNameInput.addEventListener('blur', function() {
    if (!cardholderNameIsRed) {
        cardholderNameInput.style.border = "";
    }
});

let postalCodeInput = document.getElementById('postal-code');
let postalCodeIsRed = false;

postalCodeInput.addEventListener('input', function() {
    let postalCode = postalCodeInput.value.trim();

    if (postalCode.length < 3 || postalCode.length > 12) {
        postalCodeInput.style.border = "1px solid red";
        postalCodeIsRed = true;
    } else {
        postalCodeInput.style.border = "1px solid greenyellow";
        postalCodeIsRed = false;
    }
});

postalCodeInput.addEventListener('blur', function() {
    if (!postalCodeIsRed) {
        postalCodeInput.style.border = "";
    }
});

document.getElementById('payButton').addEventListener('click', function() {
    let validationResult = validateInputs();
    let postalCodeValidationResult = isValidPostalCode();
    if (validationResult.isValid && postalCodeValidationResult.isValid && !isRed_ && !cardholderNameIsRed) {
        let eDateValidationResult = validateExpirationDate();
        if (!eDateValidationResult.isValid) {
            alert(eDateValidationResult.message);
            return;
        }
        doFun();
    } else {
        if (!validationResult.isValid) {
            alert(validationResult.message);
        }
        if (!postalCodeValidationResult.isValid) {
            alert(postalCodeValidationResult.message);
        }
        if (isRed_) {
            alert("Geçersiz son kullanma tarihi. Lütfen kontrol edin.");
        }
        if (cardholderNameIsRed) {
            alert("Kart sahibi adı 1 ila 32 karakter arasında olmalıdır.");
        }
    }
});

function validateInputs() {
    let cNumber = document.getElementById('number').value.replace(/\s/g, '');
    let eDate = document.getElementById('e-date').value;
    let cvv = document.getElementById('cvv').value;
    let cardholderName = document.getElementById('cardholdername').value;

    if (cNumber.length !== 16 || isNaN(cNumber)) {
        return { isValid: false, message: "Kredi kartı numarası hatalı." };
    }

    if (!isValidDate(eDate)) {
        return { isValid: false, message: "Son kullanma tarihi hatalı." };
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
        return { isValid: false, message: "CVV kodu hatalı." };
    }

    if (cardholderName.length < 1 || cardholderName.length > 32) {
        return { isValid: false, message: "Kart sahibi adı 1 ila 32 karakter arasında olmalıdır." };
    }

    return { isValid: true };
}

function isValidDate(dateString) {
    let parts = dateString.split('/');
    let month = parseInt(parts[0], 10);
    let year = parseInt(parts[1], 10);
    return month >= 1 && month <= 12 && year >= 0 && year <= 99;
}

function isValidPostalCode() {
    let postalCode = postalCodeInput.value.trim();

    if (postalCode.length < 3 || postalCode.length > 12) {
        return { isValid: false, message: "Postal Code: Minimum 3, maksimum 12 karakter olmalıdır." };
    }
    return { isValid: true };
}

function validateExpirationDate() {
    let eDate = document.getElementById('e-date').value;
    if (!isValidDate(eDate)) {
        return { isValid: false, message: "Geçersiz son kullanma tarihi. Lütfen kontrol edin." };
    } else {
        let parts = eDate.split('/');
        let month = parseInt(parts[0], 10);
        let year = parseInt(parts[1], 10);
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear() % 100;
        if (year < currentYear || (year === currentYear && month < (currentDate.getMonth() + 1))) {
            return { isValid: false, message: "Geçersiz son kullanma tarihi. Lütfen kontrol edin." };
        } else if (year === currentYear && month === (currentDate.getMonth() + 1) && currentDate.getDate() > 23) {
            return { isValid: false, message: "Geçersiz son kullanma tarihi. Lütfen kontrol edin." };
        } else {
            return { isValid: true };
        }
    }
}