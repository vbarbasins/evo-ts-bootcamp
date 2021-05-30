import EventEmitter from 'events';
import { readdirSync, watch } from 'fs';

export class DirWatcher {
  private watchedFileNames: string[];

  constructor(
    public eventEmitter: EventEmitter,
    public dirPath: string,
    public fileExtention: string,
  ) {
    this.watchedFileNames = this.getFileNames();
    console.log(this.watchedFileNames);
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
    this.ownWatch(1000);
  }

  ownWatch = (interval: number): () => void => {
    const int = setInterval(() => {
      const currentFileNames = this.getFileNames();
      console.log('currentFileNames', currentFileNames);
      const updatedFileNames = this.getUpdatedFiles(currentFileNames);
      if (updatedFileNames.length > 0) {
        this.watchedFileNames = currentFileNames;
        this.eventEmitter.emit('dirwatcher:changed', updatedFileNames);
      }
    }, interval);
    return () => clearInterval(int);
  }

  private getFileNames = (): string[] => {
    const allFileNames = readdirSync(this.dirPath, 'utf8');
    return allFileNames.filter((name) => (
      name.includes(`.${this.fileExtention}`)
      || name.includes(`.${this.fileExtention.toLowerCase()}`)
    ));
  }

  private getUpdatedFiles = (fileNames: string[]): string[] => {
    const updatedFileNames: string[] = [];
    fileNames.forEach((name) => {
      if (!this.watchedFileNames.includes(name)) updatedFileNames.push(name);
    });
    this.watchedFileNames.forEach((name) => {
      if (!fileNames.includes(name)) updatedFileNames.push(name);
    });
    return updatedFileNames;
  }
}
