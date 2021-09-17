import { writeFile } from 'fs/promises';
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

  // get(id) {
  //   const jString = JSON.stringify(this.newFile);
  //   const parseFile = JSON.parse(jString);
  //   return readFile(parseFile, 'utf-8');
  // }

  //.get(<id>)
  // json.parse obj :JSON.parse(obj);
  // obj should have an incremented <id>

  //.getAll

  //.remove(<id>)

  //.update(<objToUpdate>)
}
