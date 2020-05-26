"use strict";

export default class App {
    static TIME_DURATION_NEEDED_TO_WEIGHT_THE_PRODCUT = 5000;  // in miliseconds
    static INCORRECTLY_WEIGHED_PRODUCT = 'Produkt został nieprawidłowo zważony';

    constructor() {
        this.weightingStartTime = 0;
        this.tagInput = document.querySelector('#tag');
        this.nameInput = document.querySelector('#name');
        this.weightInput = document.querySelector('#weight');
        this.submitButton = document.querySelector('#submit');
        this.initializeListeners();
    }

    initializeListeners() {
        this.submitButton.addEventListener('mousedown', this.startWeightingTheProduct.bind(this));
        this.submitButton.addEventListener('mouseup', this.stopWeightingTheProduct.bind(this));
    }

    startWeightingTheProduct() {
        this.resetWeight();
        this.weightingStartTime = performance.now();
    }

    resetWeight() {
        this.setProductName('');
        this.setProductWeight('');
    }

    stopWeightingTheProduct() {
        const weightingEndTime = performance.now();
        const weightingDuration = weightingEndTime - this.weightingStartTime;
        void this.handleWeightedProduct(weightingDuration);
    }

    async handleWeightedProduct(weightingDuration) {
        if(!this.whetherTheProductWasWeightedSufficientTime(weightingDuration)) {
            this.showNotification();
            return;
        }
        const {name, weight} = await this.getProductNameAndWeight();
        this.setProductName(name);
        this.setProductWeight(weight);
    }

    whetherTheProductWasWeightedSufficientTime(weightingTime) {
        return weightingTime >= App.TIME_DURATION_NEEDED_TO_WEIGHT_THE_PRODCUT;
    }

    showNotification() {
        alert(App.INCORRECTLY_WEIGHED_PRODUCT);
    }

    async getProductNameAndWeight() {
        const tagId = this.tagInput.value;
        // logic responsible for geeting data from backend
        return Promise.resolve({name: 'testName', weight: 12});
    }
     
    setProductName(name) {
        this.nameInput.value = name;
    }

    setProductWeight(weight) {
        this.weightInput.value = weight;
    }
    
}