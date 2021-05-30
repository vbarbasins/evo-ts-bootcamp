import EventEmitter from 'events';
import { watch } from 'fs';

export class DirWatcher {
  constructor(public eventEmitter: EventEmitter) {}

  watch = (path: string) => {
    watch(path, (eventType, filename) => {
      console.log(`event type is: ${eventType}`);
      if (filename) {
        this.eventEmitter.emit('dirwatcher:changed');
      } else {
        console.log('filename not provided');
      }
    });
  }
}
