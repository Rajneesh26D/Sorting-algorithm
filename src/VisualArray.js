class VisualArray {
    constructor(size) {
        this.size = size;
        this.array = []; // Changed from 'values' to 'array' to match SortingAlgorithm expectations
        this.colors = [];
        this.speed = 30;
        this.generateRandomArray(size);
    }

    // Generate array with random heights
    generateRandomArray(size) {
        this.size = size;
        this.array = new Array(this.size);
        this.colors = new Array(this.size);
        
        for (let i = 0; i < this.size; i++) {
            this.array[i] = Math.floor(Math.random() * (height * 0.8)) + 10; // Random height
            this.colors[i] = color(100, 150, 255); // Default blue color
        }
    }

    // Draw all bars
    show() {
        const barWidth = width / this.size;
        for (let i = 0; i < this.array.length; i++) {
            fill(this.colors[i]);
            noStroke();
            rect(i * barWidth, height - this.array[i], barWidth, this.array[i]);
        }
    }

    // Highlight specific indices (used during sorting)
    highlight(index1, index2 = -1) {
        this.resetColors();
        this.colors[index1] = color(255, 100, 100); // Red for comparison
        if (index2 >= 0 && index2 < this.array.length) {
            this.colors[index2] = color(255, 100, 100); // Red for comparison
        }
    }

    // Clear all highlights
    clearHighlights() {
        this.resetColors();
    }

    // Reset all colors to default
    resetColors() {
        for (let i = 0; i < this.colors.length; i++) {
            this.colors[i] = color(100, 150, 255); // Default blue
        }
    }

    // Update the array (called after swaps)
    updateArray(newArray) {
        this.array = [...newArray];
    }

    // Set animation speed
    setSpeed(speed) {
        this.speed = speed;
    }

    // Swap values and update draw state
    async swap(i, j, delayMs) {
        this.colors[i] = color(255, 0, 0); // red
        this.colors[j] = color(255, 0, 0); // red
        await this.sleep(delayMs);
        
        let temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
        
        this.colors[i] = color(0, 255, 0); // green
        this.colors[j] = color(0, 255, 0); // green
        await this.sleep(delayMs);
        
        this.colors[i] = color(100, 150, 255); // back to default
        this.colors[j] = color(100, 150, 255); // back to default
    }

    // Sleep function
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get length
    length() {
        return this.array.length;
    }
}
