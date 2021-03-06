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
      .then(() => {
        expect(tala.id).toEqual(expect.any(String));
      });
  });

  it('should return null if no object was returned', () => {
    const db = new SimpleDb(copyStore);

    return db.get().then((display) => {
      expect(display).toBeNull();
    });
  });

  it('should return all objects in an array ', () => {
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

    return db
      .save(tala)
      .then(() => {
        db.save(luna);
      })
      .then(() => {
        return db.getAll();
      })
      .then((dogObj) => {
        expect(dogObj).toEqual(expect.arrayContaining([tala, luna]));
      });
  });
});
