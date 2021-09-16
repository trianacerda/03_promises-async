import path from 'path';
import shortid from 'shortid';
export class SimpleDb {
  constructor(destination) {
    const fileName = `${shortid.generate()}.txt`;
    this.newFile = path.join(destination, fileName);
  }

  //routes that will be used with SimpleDb

  //.save(<objToSave>)
  // function to assign unqiue ID??
  // add <id> to obj : should be 1
  // stringify obj : JSON.stringify(obj);
  save(obj) {
    const jString = JSON.stringify(obj);
    return SimpleDb.save(jString);
  }

  //.get(<id>)
  // json.parse obj :JSON.parse(obj);
  // obj should have an incremented <id>

  //.getAll

  //.remove(<id>)

  //.update(<objToUpdate>)
}
