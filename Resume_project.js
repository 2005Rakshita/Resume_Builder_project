var progressbars = document.querySelectorAll('.skill-progress>div');
var animationDone = new Array(progressbars.length).fill(false);

function initializeBars() {
    progressbars.forEach((bar) => {
        bar.style.width = "0";
        bar.style.opacity = "0";
    });
}

initializeBars();

function fillBar(bar, index) {
    if (animationDone[index]) return;
    animationDone[index] = true;
    let target = parseInt(bar.getAttribute('data-bar-width'));
    let currentWidth = 0;
    bar.style.opacity = "1";
    let interval = setInterval(() => {
        if (currentWidth >= target) {
            clearInterval(interval);
            return;
        }
        currentWidth += 1; // Increment smoothly
        bar.style.width = currentWidth + '%';
    }, 10); // Smooth animation
}

function checkScroll() {
    progressbars.forEach((bar, index) => {
        let barRect = bar.getBoundingClientRect();
        if (barRect.top <= window.innerHeight && barRect.bottom >= 0) {
            fillBar(bar, index);
        } else if (barRect.top > window.innerHeight || barRect.bottom < 0) {
            animationDone[index] = false;
            bar.style.width = "0";
            bar.style.opacity = "0";
        }
    });
}

window.addEventListener('scroll', checkScroll);
