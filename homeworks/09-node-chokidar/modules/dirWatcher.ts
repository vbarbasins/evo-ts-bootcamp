import EventEmitter from 'events';
import { readdirSync } from 'fs';

export const CHANGED_EVENT = 'dirwatcher:changed';

export type DirWatcherConfig = {
  dirPath: string,
  fileExtention: string,
  watchInterval: number,
};

export class DirWatcher {
  private watchedFileNames: string[];

  constructor(
    public eventEmitter: EventEmitter,
    public config: DirWatcherConfig,
  ) {
    this.watchedFileNames = this.getFileNames();
    this.eventEmitter.emit(CHANGED_EVENT, this.watchedFileNames);
  }

  public watch = (): () => void => {
    const int = setInterval(() => {
      const currentFileNames = this.getFileNames();
      const updatedFileNames = this.getUpdatedFiles(currentFileNames);
      if (updatedFileNames.length > 0) {
        this.watchedFileNames = currentFileNames;
        this.eventEmitter.emit(CHANGED_EVENT, updatedFileNames);
      }
    }, this.config.watchInterval);
    return () => clearInterval(int);
  }

  private getFileNames = (): string[] => {
    const allFileNames = readdirSync(this.config.dirPath, 'utf8');
    return allFileNames.filter((name) => (
      name.includes(`.${this.config.fileExtention}`)
      || name.includes(`.${this.config.fileExtention.toLowerCase()}`)
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
