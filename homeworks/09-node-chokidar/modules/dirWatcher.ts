import { watch } from 'fs';

export class DirWatcher {
  watch = (path: string) => {
    watch(path, (eventType, filename) => {
      console.log(`event type is: ${eventType}`);
      if (filename) {
        console.log(`filename provided: ${filename}`);
      } else {
        console.log('filename not provided');
      }
    });
  }
}
