const backgroundImages = [
    'url("WImages/483ut08e3jtbg.png")',
    'url("WImages/483ut08e3jtbg1.png")',
    'url("WImages/483ut08e3jtbg3.png")',
];

let intervalId;

function getNextBackgroundImage() {
    const currentImageIndex = backgroundImages.indexOf(document.body.style.backgroundImage);
    const nextImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    return backgroundImages[nextImageIndex];
}

function updateBackgroundImage() {
    const newImage = getNextBackgroundImage();
    document.body.style.backgroundImage = newImage;
    document.body.style.backgroundSize = 'cover'; //
    document.body.style.backgroundRepeat = 'no-repeat'; 
    document.body.style.backgroundPosition = 'center center'; 
    console.log('%cBackground image updated:', 'color: blue; font-size: 16px; font-weight: bold;', newImage);
}

function startBackgroundRotation() {
    updateBackgroundImage(); 
}

startBackgroundRotation();

document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        clearInterval(intervalId);
        startBackgroundRotation();
    }
});
