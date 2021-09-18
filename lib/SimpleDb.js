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
    return readFile(filePath)
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

  //if get(id) doesnt find an id-- display null message

  // getall() {
  //   return Promise.all();
  // }

  //.remove(<id>)

  //.update(<objToUpdate>)
}
