let isPaused = false;
let isStopped = false;
let matchDelay = 1500;
const pads = new GamePads();

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function GamePads() {
    let gamepad = getElementByXpath("/html/body/div[1]/div/div[1]/div/main/div[1]/div/div/div[1]/div[1]/div/div[4]/div");
    this.subscription = document.getElementsByClassName('productButton__subscriptionButton');
    this.passButton = gamepad.getElementsByTagName('button')[1];
    this.superLikeButton = gamepad.getElementsByTagName('button')[2];
    this.likeButton = gamepad.getElementsByTagName('button')[3];
    this.counter = document.getElementsByClassName('Fz($ml)')[0];
}

function checkAvailableLikes() {
    if (pads.subscription.length > 0) {
        const countdownText = pads.counter.textContent;
        const countdownSplit = countdownText.split(':');
        //convert to seconds
        const seconds = (+countdownSplit[0]) * 60 * 60 + (+countdownSplit[1]) * 60 + (+countdownSplit[2]);
        //and then milliseconds
        return seconds * 1000;
    }
    return 0;
}

function swipeRight() {
    if (isStopped)
        return;
    // A random period between 500ms and 2secs
    let randomPeriod = matchDelay;

    setTimeout(() => {
        let isOutOfLikes = false;

        const delay = checkAvailableLikes();
        if (delay > 0) {
            console.log('Out of likes, have to wait: ' + delay + ' ms');
            randomPeriod = delay;
            isOutOfLikes = true;
        }

        if (!isOutOfLikes) {
            if (isPaused) {
                setTimeout(swipeRight, randomPeriod);
            } else {
                pads.likeButton.click();
                swipeRight();
            }
        } else {
            setTimeout(() => swipeRight(), randomPeriod);
        }
    }, randomPeriod);
}

document.onkeydown = (ev) => {
    switch (ev.key) {
        case ' ':
            isPaused = !isPaused;
            console.log("Press Spacebar again to Pause/Continue");
            break;
        case 's':
            console.log("STOPPED");
            isStopped = true;
            break;
    }
};

// selector gamepad
// #t-1646534024 > div > div.App__body.H\(100\%\).Pos\(r\).Z\(0\) > div > main > div.H\(100\%\) > div > div > div.recsCardboard.W\(100\%\).Mt\(a\).H\(100\%\)--s.Px\(4px\)--s.Pos\(r\) > div.recsCardboard__cardsContainer.H\(100\%\).Pos\(r\).Z\(1\) > div > div.Pos\(a\).B\(0\).Isolate.W\(100\%\).Start\(0\).End\(0\) > div

// jspath gamepad
// document.querySelector("#t-1646534024 > div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div.recsCardboard.W\\(100\\%\\).Mt\\(a\\).H\\(100\\%\\)--s.Px\\(4px\\)--s.Pos\\(r\\) > div.recsCardboard__cardsContainer.H\\(100\\%\\).Pos\\(r\\).Z\\(1\\) > div > div.Pos\\(a\\).B\\(0\\).Isolate.W\\(100\\%\\).Start\\(0\\).End\\(0\\) > div")

// xpath gamepad
// //*[@id="t-1646534024"]/div/div[1]/div/main/div[1]/div/div/div[1]/div[1]/div/div[4]/div

// full xpath gamepad
// /html/body/div[1]/div/div[1]/div/main/div[1]/div/div/div[1]/div[1]/div/div[4]/div

console.log("PRESS SPACEBAR TO PAUSE/CONTINUE");
console.log("PRESS 's' KEY TO STOP");
console.log("RELOAD PAGE ONCE YOU ARE DONE");
swipeRight();