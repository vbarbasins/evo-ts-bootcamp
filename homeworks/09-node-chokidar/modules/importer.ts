import EventEmitter from 'events';
import { readFile } from 'fs';

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

  import = (path: string) => {
    readFile(path, 'utf8', (error, data) => {
      if (error) {
        console.log(`File deleted: ${path}`);
      } else {
        console.log(`File added: ${path}`);
        console.log(`Data in file: ${data}`);
      }
    });
  }
}
