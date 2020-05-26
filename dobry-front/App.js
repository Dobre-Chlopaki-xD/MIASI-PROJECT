"use strict";

export default class App {
    static TIME_DURATION_NEEDED_TO_WEIGHT_THE_PRODCUT = 5000;  // in miliseconds
    static INCORRECTLY_WEIGHED_PRODUCT = 'Produkt został nieprawidłowo zważony';

    constructor() {
        this.timerInterval = null;
        this.weightingStartTime = 0;

        this.timer = document.querySelector('#timer');
        this.tagInput = document.querySelector('#tag');
        this.nameInput = document.querySelector('#name');
        this.weightInput = document.querySelector('#weight');
        this.submitButton = document.querySelector('#submit');
        this.initializeListeners();
    }

    initializeListeners() {
        this.submitButton.addEventListener('mousedown', this.startWeightingTheProduct.bind(this));
        this.submitButton.addEventListener('mouseup', this.stopWeightingTheProduct.bind(this));
        this.submitButton.addEventListener('mouseout', this.stopWeightingTheProduct.bind(this));
    }

    startWeightingTheProduct() {
        this.resetWeight();
        this.startTimer();
        this.weightingStartTime = performance.now();
    }

    stopWeightingTheProduct() {
        const weightingEndTime = performance.now();
        const weightingDuration = weightingEndTime - this.weightingStartTime;
        void this.handleWeightedProduct(weightingDuration);
        clearInterval(this.timerInterval);
    }

    async handleWeightedProduct(weightingDuration) {
        if(!this.whetherTheProductWasWeightedSufficientTime(weightingDuration)) {
            this.showNotification();
            // logic responsible for send weighting break info
            return;
        }
        const {name, weight} = await this.getProductNameAndWeight();
        this.setProductName(name);
        this.setProductWeight(weight);
    }

    async getProductNameAndWeight() {
        const tagId = this.tagInput.value;
        // logic responsible for geeting data from backend
        return Promise.resolve({name: 'testName', weight: 12});
    }

    whetherTheProductWasWeightedSufficientTime(weightingTime) {
        return weightingTime >= App.TIME_DURATION_NEEDED_TO_WEIGHT_THE_PRODCUT;
    }

    showNotification() {
        alert(App.INCORRECTLY_WEIGHED_PRODUCT);
    }

    startTimer() {
        this.timerInterval = setInterval(this.updateTimer.bind(this), 10);
    }

    updateTimer() {
        const startTimeInSeconds = this.weightingStartTime / 1000;
        const currentTimeInSeconds = performance.now() / 1000;
        this.timer.value = `${this.countTimeDelta(startTimeInSeconds, currentTimeInSeconds)}s`;
    }

    countTimeDelta(start, end) {
        const delta = end - start;
        return Math.round((delta + Number.EPSILON) * 100) / 100;
    }

    resetWeight() {
        this.setProductName('');
        this.setProductWeight('');
    }
     
    setProductName(name) {
        this.nameInput.value = name;
    }

    setProductWeight(weight) {
        this.weightInput.value = weight;
    }
    
}