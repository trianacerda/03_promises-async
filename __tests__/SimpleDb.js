const path = require('path');
const shortid = require('shortid');

export class SimpleDb {
  constructor(rootDir) {
    const fileName = `${shortid.generate()}.txt`;
    this.newFile = path.join(rootDir, fileName);
  }
}
