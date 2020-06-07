"use strict";

export default class App {
    static TIME_DURATION_NEEDED_TO_WEIGHT_THE_PRODCUT = 15000;  // in miliseconds
    static INCORRECTLY_WEIGHED_PRODUCT = 'Produkt został nieprawidłowo zważony';
    static INTERRUPT_ULR = 'http://localhost:8080/engine-rest/signal';
    static PRODUCT_DATA_URL = 'http://localhost:8080/engine-rest/process-definition/key/process-id-Proces-rejestracji-produktu/start';

    constructor(exampleData) {
        this.exampleData = exampleData;
        
        this.isWeghting = false;
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
        this.isWeghting = true;
        this.resetWeighting();
        this.startTimer();
        this.weightingStartTime = performance.now();
    }

    stopWeightingTheProduct() {
        if(!this.isWeghting) {
            return;
        }
        this.isWeghting = false;
        clearInterval(this.timerInterval);
        const weightingEndTime = performance.now();
        const weightingDuration = weightingEndTime - this.weightingStartTime;
        void this.handleWeightedProduct(weightingDuration);
    }

    async handleWeightedProduct(weightingDuration) {
        if(!this.whetherTheProductWasWeightedSufficientTime(weightingDuration)) {
            this.sendInterruptSignal()
            this.showNotification();
            return;
        }
        const {name, weight} = await this.getProductNameAndWeight();
        this.setProductName(name);
        this.setProductWeight(weight);
    }

    
    async getProductNameAndWeight() {
        const tagId = this.tagInput.value;
        await this.sendWeightedProductData(tagId);
        const product = this.exampleData.get(tagId);
        return Promise.resolve(product);
    }

    async sendInterruptSignal() {
        const interruptData = { name : 'ProductTakenDownSignal'} 
        return await fetch(App.INTERRUPT_ULR, {
            method: 'POST',
            mode: 'no-cors',
            data: JSON.stringify(interruptData)
        });
    }

    async sendWeightedProductData(tagId) {
        const dataBody = {
            "variables": {
              "isTagPresent" : {
                  "value" : true,
                  "type": "Boolean"
              },
              "ProductID" : {
                  "value" : parseInt(tagId),
                  "type" : "Integer"
              }
            }
          };
        return await (await fetch(App.PRODUCT_DATA_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: JSON.stringify(dataBody)
        }));

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
        this.timer.value = this.buildTimerValue(startTimeInSeconds, currentTimeInSeconds);
    }

    buildTimerValue(startTimeInSeconds, currentTimeInSeconds) {
        return `${this.countTimeDelta(startTimeInSeconds, currentTimeInSeconds)}s`;
    }

    countTimeDelta(start, end) {
        const delta = end - start;
        return Math.round((delta + Number.EPSILON) * 100) / 100;
    }

    resetWeighting() {
        this.timer.value = this.buildTimerValue(0, 0);
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