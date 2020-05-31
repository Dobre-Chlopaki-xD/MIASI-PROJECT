"use strict";

import App from './App.js';
const exampleData = new Map();
exampleData.set('1', {name: 'mąka', weight: '1250'});
exampleData.set('2', {name: 'ryż', weight: '2000'});
exampleData.set('3', {name: 'cukier', weight: '2500'});
exampleData.set('4', {name: 'śliwki', weight: '420'});
const app = new App(exampleData);