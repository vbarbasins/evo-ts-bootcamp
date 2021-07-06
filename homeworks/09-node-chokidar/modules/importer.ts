import EventEmitter from 'events';
import { promises, readFileSync } from 'fs';
import { csvToJson } from 'csvtojson-converter';

import { CHANGED_EVENT } from './dirWatcher';

export const IMPORTED_EVENT = 'importer:imported';

export class Importer {
  constructor(public eventEmitter: EventEmitter, public dirPath: string) {}

  listen = () => {
    this.eventEmitter.addListener(CHANGED_EVENT, (fileNames) => {
      if ((fileNames as string[]).length > 0) {
        (fileNames as string[]).forEach((name) => {
          const importedObjects = this.importSync(`${this.dirPath}/${name}`);
          if (importedObjects.length > 0) {
            this.eventEmitter.emit(IMPORTED_EVENT, importedObjects);
          }
        });
      }
    });
  }

  private import = async (path: string): Promise<Object[]> => (
    promises.readFile(path)
      .then((data) => csvToJson(data))
      .catch(() => {
        console.log(`File removed at ${path}`);
        return [];
      })
  );

  private importSync = (path: string): Object[] => {
    try {
      const data = readFileSync(path, 'utf8');
      return csvToJson(data);
    } catch (e) {
      console.log(`File removed at ${path}`);
      return [];
    }
  }
}
