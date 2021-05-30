import EventEmitter from 'events';
import { watch } from 'fs';

export class DirWatcher {
  constructor(public eventEmitter: EventEmitter, public dirPath: string) {}

  watch = () => {
    watch(this.dirPath, (eventType, filename) => {
      console.log(`event type is: ${eventType}`);
      if (filename) {
        this.eventEmitter.emit('dirwatcher:changed', filename);
      } else {
        console.log('filename not provided');
      }
    });
  }
}
