import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';
export class SimpleDb {
  constructor(copyStore) {
    this.destination = copyStore;
  }

  save(obj) {
    obj.id = shortid.generate();
    // console.log('!!!!!', obj.id);
    const fileName = `${obj.id}.json`;
    const filePath = path.join(this.destination, fileName);
    const jString = JSON.stringify(obj);
    // console.log('LOOK', filePath, jString);
    return writeFile(filePath, jString);
  }

  get(id) {
    const fileName = `${id}.json`;
    const filePath = path.join(this.destination, fileName);
    return readFile(filePath, 'utf-8')
      .then((jString) => {
        return JSON.parse(jString);
      })
      .catch((err) => {
        if (err.code === 'ENOENT') {
          return null;
        }
        throw err;
      });
  }

  getAll() {
    return readdir(this.destination).then((objects) => {
      return Promise.all(
        objects.map((object) => {
          return this.get(object);
        })
      );
    });
  }
}
