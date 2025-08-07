// Controls.js

class Controls {
    constructor(visualArray) {
        this.visualArray = visualArray;
        this.sortingAlgorithm = new SortingAlgorithm(this.visualArray);

        // UI elements
        this.sizeSlider = document.getElementById('size-slider');
        this.speedSlider = document.getElementById('speed-slider');
        this.algorithmSelect = document.getElementById('algorithm-select');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');

        // Event listeners
        this.sizeSlider.addEventListener('input', () => this.generateNewArray());
        this.speedSlider.addEventListener('input', () => this.updateSpeed());
        this.resetBtn.addEventListener('click', () => this.generateNewArray());
        
        this.startBtn.addEventListener('click', async () => {
            // Disable start button during sorting
            this.startBtn.disabled = true;
            this.startBtn.textContent = 'Sorting...';
            
            const selectedAlgo = this.algorithmSelect.value;
            
            try {
                switch (selectedAlgo) {
                    case 'bubble':
                        await this.sortingAlgorithm.bubbleSort();
                        break;
                    case 'selection':
                        await this.sortingAlgorithm.selectionSort();
                        break;
                    case 'insertion':
                        await this.sortingAlgorithm.insertionSort();
                        break;
                    case 'merge':
                        await this.sortingAlgorithm.mergeSort();
                        break;
                    case 'quick':
                        await this.sortingAlgorithm.quickSort();
                        break;
                    default:
                        alert('Invalid sorting algorithm selected.');
                }
            } catch (error) {
                console.error('Error during sorting:', error);
            } finally {
                // Re-enable start button
                this.startBtn.disabled = false;
                this.startBtn.textContent = 'Start Sorting';
                this.visualArray.clearHighlights();
            }
        });

        // Initial setup
        this.updateSpeed();
        this.generateNewArray();
    }

    generateNewArray() {
        const size = parseInt(this.sizeSlider.value);
        this.visualArray.generateRandomArray(size);
        // Update the sorting algorithm's reference to the new array
        this.sortingAlgorithm.array = this.visualArray.array;
    }

    updateSpeed() {
        const speed = parseFloat(this.speedSlider.value);
        this.visualArray.setSpeed(speed);
    }
}
