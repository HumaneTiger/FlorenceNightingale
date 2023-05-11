var cMoney = document.querySelector('#ui .money span');

var cMeals = document.querySelector('#playground .meals'); 
var cWater = document.querySelector('#playground .meter.fetch'); 

var cSoaps = document.querySelector('#ui .soap p span');
var cFood = document.querySelector('#ui .food p span');
var cMeds = document.querySelector('#ui .meds p span');

var cPriceSoaps = document.querySelector('#ui .soap a span i');
var cPriceFood = document.querySelector('#ui .food a span i');
var cPriceMeds = document.querySelector('#ui .meds a span i');

function actionCook(event) {
    event.preventDefault();
    let text = '<p class="extra">You are cooking a meal.</p>';
    if (gHandsClean) {
        text += '<p class="smaller">The wounded soldiers will profit the most from that.</p>';
    } else {
        text += '<p class="smaller">Your hands are dirty. The food is waisted.</p>';
        gMeals -= 1;
    }
    if (gFood > 0) {
        showBlocker(text, 4);
        let audio = allAudio.querySelector(".cooking");
        audio.volume = 0.2; audio.play();
    window.setTimeout(function() {
            gMeals += 1;
            gFood -= 1;
            updateUI();
            updateMeals();
        }, 4 * 1000 + 400);
    } else {
        let audio = allAudio.querySelector(".nope");
        audio.volume = 0.2; audio.play();
        // play nope sound
    }
}
function actionWrite(event) {
    event.preventDefault();
    let audio = allAudio.querySelector(".write");
    audio.volume = 0.2; audio.play();
    showBlocker('<p>You are writing a plea to the English press.</p><p class="smaller">Donations from your homeland are needed to improve the situation here.</p><p class="smaller">Finding the right words takes a while....</p>', 10);
    window.setTimeout(function() {
        gMoney = gMoney + 20 + Math.floor(Math.random() * 10);
        let audio = allAudio.querySelector(".money");
        audio.volume = 0.2; audio.play();
        updateUI();
    }, 10 * 1000 + 400);
}
function actionFetch(event) {
    event.preventDefault();
    let audio = allAudio.querySelector(".water");
    audio.volume = 0.2; audio.play();
    showBlocker('<p class="extra">You are fetching some fresh water.</p><p class="smaller">Water and soap are the greatest weapons against mass infections and unnecessary diseases.</p>', 4);
    window.setTimeout(function() {
        gWater = 100;
        updateWater();
    }, 4 * 1000 + 400);
}
function actionWash(event) {
    event.preventDefault();
    let audio = allAudio.querySelector(".water");
    audio.volume = 0.2; audio.play();
    showBlocker('<p class="extra">You carefully wash your hands.</p><p class="smaller">Cooking food with dirty hands from cleaning the beds will ruin the meal.</p>', 2);
    window.setTimeout(function() {
        gWater -= 15;
        gHandsClean = true;
        updateWater();
    }, 2 * 1000 + 400);
}

function buySoap(event) {
    event.preventDefault();
    if (gMoney >= pSoaps) {
        gMoney -= pSoaps;
        gSoaps += 1;
        updateUI();
    } else {
        // play nope sound
        let audio = allAudio.querySelector(".nope");
        audio.volume = 0.2; audio.play();
}
}
function buyFood(event) {
    event.preventDefault();
    if (gMoney >= pFood) {
        gMoney -= pFood;
        gFood += 1;
        updateUI();
    } else {
        // play nope sound
        let audio = allAudio.querySelector(".nope");
        audio.volume = 0.2; audio.play();
}
}
function buyMeds(event) {
    event.preventDefault();
    if (gMoney >= pMeds) {
        gMoney -= pMeds;
        gMeds += 1;
        updateUI();
    } else {
        // play nope sound
        let audio = allAudio.querySelector(".nope");
        audio.volume = 0.2; audio.play();
}
}

function bedAssign(event) {
    event.preventDefault();
    if (gSoldiers.length > 0) {

        let firstSoldier = gSoldiers.shift();

        soldierPool.childNodes[0].classList.remove('fade-in');

        window.setTimeout(function() {
            soldierPool.removeChild(soldierPool.childNodes[0]);
        }, 500);

        if (firstSoldier.classList.contains('bleed')) {
            gActiveBed.classList.add('bleed');
        } else if (firstSoldier.classList.contains('limp')) {
            gActiveBed.classList.add('limp');
        } else {
            gActiveBed.classList.add('sick');
        }
        updateBedHealth(gActiveBed, getRandomArbitrary(25, 75));

        updateBedActions();
    }
}

function bedUpgradeMid(event) {
    event.preventDefault();
    let bedActionElem = event.target.closest('li');
    
    if (gActiveBed) {
        if (!bedActionElem.classList.contains('inactive')) {
            let audio = allAudio.querySelector(".upgrade");
            audio.volume = 0.2; audio.play();
                    gActiveBed.classList.remove('cond-low');
            gActiveBed.classList.add('cond-mid');
            gMoney -= 10;
            updateUI();
            updateBedActions();
        } else {
            // play nope sound
            let audio = allAudio.querySelector(".nope");
            audio.volume = 0.2; audio.play();
        }
    }
}

function bedUpgradeHigh(event) {
    event.preventDefault();
    let bedActionElem = event.target.closest('li');
    
    if (gActiveBed) {
        if (!bedActionElem.classList.contains('inactive')) {
            let audio = allAudio.querySelector(".upgrade");
            audio.volume = 0.2; audio.play();
            gActiveBed.classList.remove('cond-mid');
            gActiveBed.classList.add('cond-high');
            gMoney -= 15;
            updateUI();
            updateBedActions();
        } else {
            // play nope sound
            let audio = allAudio.querySelector(".nope");
            audio.volume = 0.2; audio.play();
        }
    }
}

function bedMeal(event) {
    event.preventDefault();
    let bedActionElem = event.target.closest('li');
    
    if (gActiveBed) {
        if (!bedActionElem.classList.contains('inactive')) {
            improveBedHealth(gActiveBed, 'meal');
            gMeals -= 1;
            updateMeals();
            updateBedActions();
        } else {
            // play nope sound
            let audio = allAudio.querySelector(".nope");
            audio.volume = 0.2; audio.play();

        }
    }
}


function bedMeds(event) {
    event.preventDefault();
    let bedActionElem = event.target.closest('li');
    
    if (gActiveBed) {
        if (!bedActionElem.classList.contains('inactive')) {
            improveBedHealth(gActiveBed, 'meds');
            gMeds -= 1;
            updateUI();
            updateBedActions();
        } else {
            // play nope sound
            let audio = allAudio.querySelector(".nope");
            audio.volume = 0.2; audio.play();
        }
    }
}

function improveBedHealth(gActiveBed, type) {

    let currentHealth = getBedHealth(gActiveBed);
    let improvedHealth;
    let factor = 1.05;

    // by state

    if (type === 'meal') {
        if (gActiveBed.classList.contains('limp') || gActiveBed.classList.contains('bleed')) {
            factor += 0.16;
        } else {
            factor += 0.09;
        }
    } else if (type === 'meds') {
        if (gActiveBed.classList.contains('sick') || gActiveBed.classList.contains('bleed')) {
            factor += 0.21;
        } else {
            factor += 0.15;
        }
    } else {
        factor += (Math.random() / 9);
    }

    // by condition
    if (gActiveBed.classList.contains('cond-high')) {
        factor *= 1.3;
    } else if (gActiveBed.classList.contains('cond-mid')) {
        factor *= 1.1;
    }

    improvedHealth = currentHealth * factor;

    updateBedHealth(gActiveBed, improvedHealth);

    if (improvedHealth >= 100) {
        // soldier recovered
        // play success sound
        // show crosses
        //let audio = allAudio.querySelector(".life");
        //audio.volume = 0.2; audio.play();
    // money
        var life = parseInt(document.querySelector('#survivors span').textContent, 10);
        life += 1;
        document.querySelector('#survivors span').textContent = life;
        gMoney = gMoney + 3 + Math.floor(Math.random() * 5);
        let audio = allAudio.querySelector(".money");
        audio.volume = 0.3; audio.play();
        removeSoldier(gActiveBed);
        updateUI();
    }

}

function changeBedHealth(bed) {

    let currentHealth = getBedHealth(bed);
    let changedHealth;
    let factor = 0.96;

    // by condition
    if (bed.classList.contains('cond-high')) {
        factor = 0.99;
    } else if (bed.classList.contains('cond-mid')) {
        factor = 0.97;
    }

    factor = factor + ((Math.random() - 0.39) / 4);

    changedHealth = currentHealth * factor;

    updateBedHealth(bed, changedHealth);

    if (changedHealth >= 100) {
        // soldier recovered
        // play success sound
        // show crosses
        //let audio = allAudio.querySelector(".life");
        //audio.volume = 0.2; audio.play();
        // money
        gMoney = gMoney + 3 + Math.floor(Math.random() * 5);
        let audio = allAudio.querySelector(".money");
        audio.volume = 0.3; audio.play();
        var life = parseInt(document.querySelector('#survivors span').textContent, 10);
        life += 1;
        document.querySelector('#survivors span').textContent = life;
        removeSoldier(bed);
        updateUI();
    }

    if (changedHealth <= 0) {
        var dead = parseInt(document.querySelector('#victims span').textContent, 10);
        dead += 1;
        document.querySelector('#victims span').textContent = dead;

        // soldier dead
        let audio = allAudio.querySelector(".dead");
        audio.volume = 0.2; audio.play();
        // play fail sound
        removeSoldier(bed);
        updateUI();
    }

}

function removeSoldier(bed) {

    let bedExtension = bed.nextSibling;

    bed.classList.remove('sick', 'bleed', 'limp');

    bedExtension.classList.add('hidden');

}

function updateBedHealth(bed, health) {
    // health 1 - 100

    let bedExtension = bed.nextSibling;

    if (bedExtension.classList.contains('bed-extension')) {

        bedExtension.classList.remove('hidden');

        let meterBar = bedExtension.querySelector('.health-meter span.bar');

        meterBar.style.width = health + '%';

        // reset
        bedExtension.classList.remove('crit', 'medium', 'okay');

        if (health < 40) {
            bedExtension.classList.add('crit');
        } else if (health < 60) {
            bedExtension.classList.add('medium');
        } else  {
            bedExtension.classList.add('okay');
        }
    }
}

function getBedHealth(bed) {

    let bedExtension = bed.nextSibling;

    if (bedExtension.classList.contains('bed-extension')) {
        let meterBar = bedExtension.querySelector('.health-meter span.bar');

        return parseInt(meterBar.style.width.slice(0, -1), 10); // remove trailing % char
    }

    return false;

}

function bedClean(event) {
    event.preventDefault();
    gWater -= 15;
    gHandsClean = false;
    let audio = allAudio.querySelector(".clean");
    audio.volume = 0.2; audio.play();
}

function updateUI() {
    updateMoney();
    updateSoaps();
    updateFood();
    updateMeds();
    updateWater();
    if (!calmPlay) {
        calmPLay = true;
        let audio = allAudio.querySelector(".calm");
        audio.volume = 0.6; audio.play();
        }
}

function updateMoney() {
    cMoney.textContent = gMoney;
    if (gMoney < 0) { cMoney.style.color = "red"; } else { cMoney.style.color = ""; }
}
function updateSoaps() {
    cSoaps.textContent = gSoaps;
    cPriceSoaps.textContent = pSoaps;
    if (gMoney < pSoaps) { cPriceSoaps.style.color = "red"; } else { cPriceSoaps.style.color = ""; }
}
function updateFood() {
    cFood.textContent = gFood;    
    cPriceFood.textContent = pFood;
    if (gMoney < pFood) { cPriceFood.style.color = "red"; } else { cPriceFood.style.color = ""; }
}
function updateMeds() {
    cMeds.textContent = gMeds;
    cPriceMeds.textContent = pMeds;
    if (gMoney < pMeds) { cPriceMeds.style.color = "red"; } else { cPriceMeds.style.color = ""; }
}

function updateMeals() {
    let meals = cMeals.querySelectorAll('span');
    if (meals.length > gMeals) {
        cMeals.removeChild(meals[0]);
    } else {
        cMeals.appendChild(document.createElement('span'));
    }
}

function updateWater() {
    let meter = cWater.querySelector('.bar');
    meter.style.width = gWater + '%';
}

function getActiveBedState() {
    if (gActiveBed !== null) {

        let state = 'empty', condition;
        
        if (gActiveBed.classList.contains('bleed')) state = 'bleed';
        if (gActiveBed.classList.contains('limp')) state = 'limp';
        if (gActiveBed.classList.contains('sick')) state = 'sick';

        if (gActiveBed.classList.contains('cond-low')) condition = 'low';
        if (gActiveBed.classList.contains('cond-mid')) condition = 'mid';
        if (gActiveBed.classList.contains('cond-high')) condition = 'high';

        return {
            state: state,
            condition: condition
        }
    }

    return false;
}

function updateBedActions() {

    let assign = cBedActions.querySelector('li.assign');
    let upgradeMid = cBedActions.querySelector('li.upgrade-mid');
    let upgradeHigh = cBedActions.querySelector('li.upgrade-high');
    let meal = cBedActions.querySelector('li.meal');
    let meds = cBedActions.querySelector('li.meds');
    let clean = cBedActions.querySelector('li.clean');

    // first lets reset actions

    assign.classList.remove('inactive', 'hidden');
    upgradeMid.classList.remove('inactive', 'hidden');
    upgradeHigh.classList.remove('inactive', 'hidden');
    meal.classList.remove('inactive', 'hidden');
    meds.classList.remove('inactive', 'hidden');
    clean.classList.remove('inactive', 'hidden');

    let bedState = getActiveBedState();

    if (bedState) {

        // assign
        if (bedState.state === 'empty') {
            assign.classList.add('active');
            if (gSoldiers.length === 0) { assign.classList.add('inactive'); }
        } else {
            assign.classList.add('hidden');
        }

        // upgrade action
        if (bedState.state !== 'empty') {
            upgradeMid.classList.add('hidden');
            upgradeHigh.classList.add('hidden');
        } else if (bedState.condition === 'low') {
            upgradeHigh.classList.add('hidden');
            if (gMoney < 10) { upgradeMid.classList.add('inactive'); }
        } else if (bedState.condition === 'mid') {
            if (gMoney < 15) { upgradeHigh.classList.add('inactive'); }
            upgradeMid.classList.add('hidden');
        } else if (bedState.condition === 'high') {
            upgradeMid.classList.add('hidden');
            upgradeHigh.classList.add('hidden');
        }

        // meal
        if (bedState.state !== 'empty') {
            if (gMeals <= 0) { meal.classList.add('inactive'); }
        } else {
            meal.classList.add('hidden');
        }

        // meds
        if (bedState.state !== 'empty') {
            meds.classList.add('active');
            if (gMeds <= 0) { meds.classList.add('inactive'); }
        } else {
            meds.classList.add('hidden');
        }

        // clean
        clean.classList.add('active');

    }

}