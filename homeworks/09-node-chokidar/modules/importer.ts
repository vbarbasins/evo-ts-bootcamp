import EventEmitter from 'events';
import { readFile } from 'fs';

export class Importer {
  constructor(public eventEmitter: EventEmitter, public dirPath: string) {}

  listen = () => {
    this.eventEmitter.addListener('dirwatcher:changed', (filename) => {
      console.log('DirWatcher emitted event: "dirwatcher:changed"', filename);
      this.import(`${this.dirPath}/${filename}`);
    });
  }

  import = (path: string) => {
    readFile(path, 'utf8', (error, data) => {
      console.log(data);
    });
  }
}
