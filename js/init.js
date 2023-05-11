var uiBlocker = document.querySelector(".ui-blocker");
var startDialog = document.querySelector("aside.start");
var gameDialog = document.querySelector("aside.game");
var calmPlay = false;
var cBedActions = document.getElementById('ui-bed');
var gActiveBed = null;
var gGameLoopId;

var gMoney = 40;
var gSoaps = 4;
var gFood = 8;
var gMeds = 2;

var gMeals = 2;
var gWater = 100;

var gSoldiers = [];

var gHandsClean = true;

var pSoaps = 3;
var pFood = 2;
var pMeds = 5;

var gSpawnChance = 0.1;

function initObjects() {
    addBeds();
}

function initGlobalHoverListener() {
    document.body.addEventListener('mouseover', function(event) {
        // everything is coming in here
        // i am interested only in beds
        if (event.target.classList.contains('bed')) {

            gActiveBed = event.target;

            updateBedActions();
            cBedActions.classList.remove('hidden');
            cBedActions.style.left = gActiveBed.offsetLeft + 'px';
            cBedActions.style.top = gActiveBed.offsetTop + 'px';

        } else {

            if (gActiveBed !== null) {
                if (cBedActions.contains(event.target)) {
                    // mouse cursor is inside the bed actions menu
                    // do nothing
                } else {
                    // mouse cursor has left the bed actions menu
                    cBedActions.classList.add('hidden');
                    gActiveBed = null;
                }
            }

        }

    }, false);
}

function runGameLoop() {

    gGameLoopId = window.setInterval(function() {

        // spawn new soldiers

        if (Math.random() <= gSpawnChance) {
            spawnSoldier();
        }

        // change health of bed soldiers

        for (var i = 0; i < bedPool.childNodes.length; i += 1) {
            let bed = bedPool.childNodes[i];
            if (bed.classList.contains('bleed') || bed.classList.contains('sick') || bed.classList.contains('limp')) {
                changeBedHealth(bed);
            }
        }

        // death!

        // spread dirt / blood / vomit

    }, 1000);

}

function init() {

    initObjects();

    initGlobalHoverListener();

    updateUI();

    runGameLoop();

}

function showBlocker(text, seconds) {

    uiBlocker.classList.remove('hidden');

    window.setTimeout(function() {
        uiBlocker.querySelector('.inner').innerHTML = text;
        uiBlocker.classList.add("fade-in");
    }, 1);

    window.setTimeout(function() {
        uiBlocker.classList.remove("fade-in");
    }, seconds * 1000);

    window.setTimeout(function() {
        uiBlocker.classList.add("hidden");
    }, seconds * 1000 + 400);

}

function playNormal() {

    let audio = allAudio.querySelector(".waves");
    audio.volume = 0.5; audio.play();
    startChapterShoreOfTheDeadlyCliffs(true);
    
}

/* helper */

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

(function () {
    init();
})();