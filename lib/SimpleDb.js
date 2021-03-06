import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';
export class SimpleDb {
  constructor(copyStore) {
    this.destination = copyStore;
  }

  save(obj) {
    obj.id = shortid.generate();
    return writeFile(
      path.join(this.destination, `${obj.id}.json`),
      JSON.stringify(obj)
    );
  }

  get(id) {
    return readFile(path.join(this.destination, `${id}`), 'utf-8')
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
    return readdir(this.destination).then((dogs) => {
      return Promise.all(
        dogs.map((dogObj) => {
          return this.get(dogObj);
        })
      );
    });
  }
}
