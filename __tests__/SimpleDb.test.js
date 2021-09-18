import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../lib/SimpleDb.js';

describe('file copier', () => {
  const copyStore = '../copyStore';

  beforeEach(() => {
    return rm(copyStore, { force: true, recursive: true }).then(() => {
      return mkdir(copyStore, { recursive: true });
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

  xit('should return all ', () => {
    const db = new SimpleDb(copyStore);
    const tala = {
      breed: 'dog',
      color: 'tri',
      paws: 4,
    };

    const luna = {
      breed: 'dog',
      color: 'blue merle',
      paws: 5,
    };

    const dogs = [
      {
        breed: 'dog',
        color: 'tri',
        paws: 4,
        id: expect.any(String),
      },
      {
        breed: 'dog',
        color: 'blue merle',
        paws: 5,
        id: expect.any(String),
      },
    ];

    return db
      .save(tala)
      .then(() => {
        db.save(luna);
      })
      .then(() => {
        db.getAll();
      })
      .then((objects) => {
        console.log('LOOK', db.getAll());
        expect(objects).toEqual(dogs);
      });
  });
});
