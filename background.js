// const backgroundImages = [
//     'url("WImages/483ut08e3jtbgw.png")',
//     'url("WImages/483ut08e3jtbgw1.png")',
// ];

// let intervalId;

// function getNextBackgroundImage() {
//     const currentImageIndex = backgroundImages.indexOf(document.body.style.backgroundImage);
//     const nextImageIndex = (currentImageIndex + 1) % backgroundImages.length;
//     return backgroundImages[nextImageIndex];
// }

// function updateBackgroundImage() {
//     const newImage = getNextBackgroundImage();
//     document.body.style.backgroundImage = newImage;
//     document.body.style.backgroundSize = 'cover';
//     document.body.style.backgroundRepeat = 'no-repeat';
//     document.body.style.backgroundPosition = 'center center';

//     const modalDiv = document.querySelector('.modal-window > div');
//     modalDiv.style.backgroundImage = newImage;
//     modalDiv.style.backgroundSize = 'cover';
//     modalDiv.style.backgroundPosition = 'center center';

//     console.log('%cBackground image updated:', 'color: blue; font-size: 16px; font-weight: bold;', newImage);
// }

// function startBackgroundRotation() {
//     updateBackgroundImage();
//     intervalId = setInterval(updateBackgroundImage, 60000); 
// }

// startBackgroundRotation();

// document.addEventListener('visibilitychange', function() {
//     if (!document.hidden) {
//         clearInterval(intervalId);
//         startBackgroundRotation();
//     }
// });