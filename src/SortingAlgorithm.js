class SortingAlgorithm {
  constructor(visualArray) {
    this.visualArray = visualArray;
    this.array = visualArray.array;
    this.isSorting = false;
  }

  async bubbleSort() {
    if (this.isSorting) return;
    this.isSorting = true;

    let arr = this.array;
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this.visualArray.highlight(j, j + 1);
        await this.sleep();

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          this.visualArray.updateArray(arr);
        }

        this.visualArray.clearHighlights();
      }
    }

    this.isSorting = false;
  }

  async selectionSort() {
    if (this.isSorting) return;
    this.isSorting = true;

    let arr = this.array;
    let n = arr.length;

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        this.visualArray.highlight(minIdx, j);
        await this.sleep();

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
        this.visualArray.clearHighlights();
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        this.visualArray.updateArray(arr);
      }
    }

    this.isSorting = false;
  }

  async insertionSort() {
    if (this.isSorting) return;
    this.isSorting = true;

    let arr = this.array;
    let n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        this.visualArray.highlight(j, j + 1);
        await this.sleep();

        arr[j + 1] = arr[j];
        this.visualArray.updateArray(arr);
        this.visualArray.clearHighlights();
        j--;
      }

      arr[j + 1] = key;
      this.visualArray.updateArray(arr);
    }

    this.isSorting = false;
  }

  async mergeSort() {
    if (this.isSorting) return;
    this.isSorting = true;

    await this.#mergeSortHelper(0, this.array.length - 1);
    this.isSorting = false;
  }

  async #mergeSortHelper(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    await this.#mergeSortHelper(left, mid);
    await this.#mergeSortHelper(mid + 1, right);
    await this.#merge(left, mid, right);
  }

  async #merge(left, mid, right) {
    const arr = this.array;
    const temp = [];

    let i = left, j = mid + 1;

    while (i <= mid && j <= right) {
      this.visualArray.highlight(i, j);
      await this.sleep();

      if (arr[i] < arr[j]) {
        temp.push(arr[i++]);
      } else {
        temp.push(arr[j++]);
      }
      this.visualArray.clearHighlights();
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    for (let k = left; k <= right; k++) {
      arr[k] = temp[k - left];
      this.visualArray.updateArray(arr);
      await this.sleep();
    }
  }

  async quickSort() {
    if (this.isSorting) return;
    this.isSorting = true;

    await this.#quickSortHelper(0, this.array.length - 1);
    this.isSorting = false;
  }

  async #quickSortHelper(low, high) {
    if (low < high) {
      const pi = await this.#partition(low, high);
      await this.#quickSortHelper(low, pi - 1);
      await this.#quickSortHelper(pi + 1, high);
    }
  }

  async #partition(low, high) {
    let arr = this.array;
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      this.visualArray.highlight(j, high);
      await this.sleep();

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        this.visualArray.updateArray(arr);
      }

      this.visualArray.clearHighlights();
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    this.visualArray.updateArray(arr);
    return i + 1;
  }

  sleep() {
    const speed = getSpeed();
    return new Promise(resolve => setTimeout(resolve, 1000 / speed));
  }
}
