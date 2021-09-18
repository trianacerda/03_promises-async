import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';
export class SimpleDb {
  constructor(copyStore) {
    this.destination = copyStore;
  }

  save(obj) {
    obj.id = shortid.generate();
    this.filePath = path.join(this.destination, `${obj.id}.json`);
    return writeFile(this.filePath, JSON.stringify(obj)).then(() => {
      return this.filePath;
    });
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
