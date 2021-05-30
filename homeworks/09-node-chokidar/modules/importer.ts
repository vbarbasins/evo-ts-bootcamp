import EventEmitter from 'events';
import { promises } from 'fs';

import { CHANGED_EVENT } from './dirWatcher';

export class Importer {
  constructor(public eventEmitter: EventEmitter, public dirPath: string) {}

  listen = () => {
    this.eventEmitter.addListener(CHANGED_EVENT, (fileNames) => {
      console.log('DirWatcher emitted event: "dirwatcher:changed"', fileNames);
      if ((fileNames as string[]).length > 0) {
        (fileNames as string[]).forEach((name) => {
          this.import(`${this.dirPath}/${name}`);
        });
      }
    });
  }

  public import = (path: string): Promise<void> => (
    promises.readFile(path)
      .then((buffer) => {
        console.log(buffer);
      })
      .catch((error) => {
        console.log(error);
      })
  );
}
