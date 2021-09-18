import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../lib/SimpleDb.js';

describe('file copier', () => {
  const copyStore = '../copyStore';

  beforeEach(() => {
    return rm(copyStore, { force: true, recursive: true }).then(() => {
      return mkdir(copyStore);
    });
  });

  it('should save an obj and generate random id string', () => {
    const db = new SimpleDb(copyStore);
    const tala = {
      breed: 'dog',
      color: 'tri',
      paws: 4,
    };
    return db.save(tala).then(() => {
      expect(tala.id).toEqual(expect.any(String));
    });
  });
  it('should get a file by id and read it', () => {
    const db = new SimpleDb(copyStore);
    const tala = {
      breed: 'dog',
      color: 'tri',
      paws: 4,
    };

    return db
      .save(tala)
      .then(() => {
        return db.get(tala.id);
      })
      .then((db) => {
        expect(db.id).toEqual(tala.id);
      });
  });

  it('should return null if no object was returned', () => {
    const db = new SimpleDb(copyStore);

    return db.get().then((display) => {
      expect(display).toBeNull();
    });
  });

  // it('should return all ', () => {
  //   const db = new SimpleDb(copyStore);
  //   const tala = {
  //       breed: 'dog',
  //       color: 'tri',
  //       paws: 4,
  //     },
  //   ;
  //   return db.getAll().then((db) => {
  //     return db.get(tala.id);
  //     expect(tala.id).toEqual();
  //   });
  // });
});
