import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';
export class SimpleDb {
  constructor(copyStore) {
    this.destination = copyStore;
  }

  //routes that will be used with SimpleDb

  save(obj) {
    const fileId = shortid.generate();
    obj.id = fileId;
    const fileName = `${obj.id}.json`;
    const filePath = path.join(this.destination, fileName);
    const jString = JSON.stringify(obj);

    return writeFile(filePath, jString);
  }

  get(id) {
    const fileName = `${id}.json`;
    const filePath = path.join(this.destination, fileName);
    return readFile(filePath).then((jString) => {
      const parseFile = JSON.parse(jString);
      return parseFile;
    });
  }

  //.getAll

  //.remove(<id>)

  //.update(<objToUpdate>)
}
