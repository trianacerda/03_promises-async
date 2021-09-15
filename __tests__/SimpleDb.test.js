import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from './SimpleDb.js';

describe('file copier', () => {
  const destination = './__tests__/destination';

  beforeEach(() => {
    return rm(destination, { force: true, recursive: true }).then(() => {
      return mkdir(destination);
    });
  });

  it('saved obj should have an id', () => {
    const db = new SimpleDb(destination);
    const tala = {
      breed: 'dog',
      color: 'tri',
      paws: 4,
    };
    return db.save(tala).then(() => {
      expect(tala.id).toEqual(expect.any(String));
    });
  });
});
