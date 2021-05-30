import EventEmitter from 'events';
import { readdirSync, watch } from 'fs';

export class DirWatcher {
  private dirFiles: string[];

  constructor(
    public eventEmitter: EventEmitter,
    public dirPath: string,
    public fileExtention: string,
  ) {
    this.dirFiles = this.getFileNames();
    console.log(this.dirFiles);
  }

  watch = () => {
    watch(this.dirPath, (eventType, filename) => {
      console.log(`event type is: ${eventType}`);
      if (filename) {
        this.eventEmitter.emit('dirwatcher:changed', filename);
      } else {
        console.log('filename not provided');
      }
    });
    this.ownWatch(this.dirPath, 1000);
  }

  ownWatch = (path: string, interval: number): () => void => {
    const int = setInterval(() => {
      console.log(this.getFileNames());
    }, interval);
    return () => clearInterval(int);
  }

  getFileNames = (): string[] => {
    const allFileNames = readdirSync(this.dirPath, 'utf8');
    return allFileNames.filter((name) => (
      name.includes(`.${this.fileExtention}`)
      || name.includes(`.${this.fileExtention.toLowerCase()}`)
    ));
  }
}
