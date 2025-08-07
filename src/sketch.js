let visualArray;
let controls;

function setup() {
    // Create canvas and append it to the canvas container
    let canvas = createCanvas(windowWidth, windowHeight * 0.6);
    canvas.parent('canvas-container'); // Attach canvas to the container div
    
    // Initialize visual array with default size
    visualArray = new VisualArray(getArraySize());
    
    // Set up UI controls
    controls = new Controls(visualArray);
    
    frameRate(getSpeed());
    
    console.log("Setup complete - Canvas created and attached");
}

function draw() {
    background(30, 30, 50); // Dark blue background
    if (visualArray) {
        visualArray.show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight * 0.6);
    if (visualArray) {
        visualArray.generateRandomArray(getArraySize());
    }
}

// Utility: Get current animation speed from slider
function getSpeed() {
    const speedSlider = document.getElementById("speed-slider");
    if (speedSlider) {
        // Map slider value (1-10) to frame rate (5-60 FPS)
        return map(parseInt(speedSlider.value), 1, 10, 5, 60);
    }
    return 30; // default fallback
}

// Utility: Get current array size from slider
function getArraySize() {
    const sizeSlider = document.getElementById("size-slider");
    if (sizeSlider) {
        return parseInt(sizeSlider.value);
    }
    return 50; // default fallback
}

// Helper function for mapping values (in case p5.js map function isn't available)
function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
