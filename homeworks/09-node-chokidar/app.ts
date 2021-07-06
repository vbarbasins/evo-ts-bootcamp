import { EventEmitter } from 'events';

import { DirWatcher, DirWatcherConfig } from './modules/dirWatcher';
import { Importer, IMPORTED_EVENT } from './modules/importer';

const PATH_TO_DATA = './data';

const envWatchInterval = process.env.INTERVAL && Number(process.env.INTERVAL);

const DIR_WATCHER_CONFIG: DirWatcherConfig = {
  dirPath: PATH_TO_DATA,
  fileExtention: 'CSV',
  watchInterval: envWatchInterval || 10000,
};

const eventEmitter = new EventEmitter();
const dirWatcher = new DirWatcher(eventEmitter, DIR_WATCHER_CONFIG);
const importer = new Importer(eventEmitter, PATH_TO_DATA);

eventEmitter.addListener(IMPORTED_EVENT, (data) => {
  console.log(`emitted event ${IMPORTED_EVENT} with data:`);
  console.log(data);
});

importer.listen();
dirWatcher.watch();
