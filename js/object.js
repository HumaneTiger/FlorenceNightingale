var playground = document.getElementById('playground');
var soldierPool = document.getElementById('soldier-pool');
var bedPool = document.getElementById('bed-pool');

var proctoBed = document.querySelector(".bed");
var proctoBedExtension = document.querySelector(".bed-extension");

var proctoSoldier = document.querySelector(".soldier");

function addObject(clone, visible) {
    let newObject = bedPool.appendChild(clone);
    if (visible) {
        newObject.classList.remove("hidden");
    }
    return newObject;
}

function addSoldierObject(clone, visible) {
    let newObject = soldierPool.appendChild(clone);
    if (visible) {
        newObject.classList.remove("hidden");
    }
    window.setTimeout(function() {
        newObject.classList.add('fade-in');
    }, 1);

    return newObject;
}

function spawnSoldier() {
    let newSoldier = addSoldierObject(proctoSoldier.cloneNode(true), true);

    let x = Math.floor(Math.random() * 230) - 110;
    let y = Math.floor(Math.random() * 100) - 50;

    let state = Math.floor(Math.random() * 3);

    newSoldier.style.left = 520 + x + 'px';
    newSoldier.style.top = 120 + y + 'px';
    newSoldier.style.zIndex = 120 + y;

    if (state === 0) {
        newSoldier.classList.add("bleed");
    } else if (state === 1) {
        newSoldier.classList.add("limp");
    } else {
        newSoldier.classList.add("sick");
    }

    gSoldiers.push(newSoldier);

    updateBedActions();

}


function addBed(x, y, deg, state, cond) {

    let newBed = addObject(proctoBed.cloneNode(true), true);

    newBed.style.left = x + 'px';
    newBed.style.top = y + 'px';
    newBed.style.transform = 'rotate(' + deg + 'deg)';

    let newBedExtension = addObject(proctoBedExtension.cloneNode(true), false);

    newBedExtension.style.left = x + 'px';
    newBedExtension.style.top = y + Math.abs(Math.round(deg/5)) + 'px';

    if (cond) {
        newBed.classList.remove('cond-low');
        newBed.classList.add('cond-' + cond);
    }

    if (state) {
        newBed.classList.add(state);
        newBedExtension.classList.remove('hidden');
        updateBedHealth(newBed, getRandomArbitrary(40, 80));
    }

}

function addBeds() {

    addBed(160, 100, -30, 'bleed', 'mid');
    addBed(300, 120, 10);
    addBed(780, 420, -30);

    addBed(170, 310, 15);
    addBed(280, 330, -8, 'sick');
    addBed(390, 320, 10);

    addBed(200, 450, -80, false , 'mid');
    addBed(280, 550, 70);
    addBed(450, 550, -100);

    addBed(580, 480, -80);
    addBed(680, 550, 30, 'limp', 'high');
    addBed(714, 293, -80);

}
