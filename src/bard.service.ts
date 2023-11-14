import Bard from 'bard-ai';
const BardJS = require('fix-esm').require('bard-ai').default;

export class MyBard {
  bard: Bard;
  constructor() {
    this.bard = new BardJS({});
  }
  getBard() {
    return this.bard;
  }
}
