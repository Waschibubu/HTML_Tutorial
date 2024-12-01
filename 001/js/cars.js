const image_track = document.getElementById('image_track');

window.onmousedown = e => {
    image_track.dataset.mouseMove = e.clientX;
}

window.onmouseup = e => {
    image_track.dataset.mouseMove = "0";
    image_track.dataset.oldPercentage = image_track.dataset.percentage;
    console.log(image_track.dataset.percentage);
}

window.onmousemove = e => {
    if (image_track.dataset.mouseMove === "0") return;

    const mouseDelta = parseFloat(image_track.dataset.mouseMove) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = Math.round((mouseDelta / maxDelta) * -100),
        newPercentageInfinite = parseFloat(image_track.dataset.oldPercentage) + percentage,
        newPercentage = Math.max(Math.min(newPercentageInfinite, 0), -100);

    image_track.dataset.percentage = newPercentage;
    image_track.style.transform = `translate(${newPercentage}%, -50%)`;

    for (const image of image_track.getElementsByClassName("image")) {
        image.style.objectPosition = `${100 +newPercentage} 50%`
    }
}