import { EventEmitter } from 'events';

import { DirWatcher, DirWatcherConfig } from './modules/dirWatcher';
import { Importer } from './modules/importer';

const PATH_TO_DATA = './data';

const DIR_WATCHER_CONFIG: DirWatcherConfig = {
  dirPath: PATH_TO_DATA,
  fileExtention: 'CSV',
  watchInterval: 10000,
};

const eventEmitter = new EventEmitter();
const dirWatcher = new DirWatcher(eventEmitter, DIR_WATCHER_CONFIG);
const importer = new Importer(eventEmitter, PATH_TO_DATA);

dirWatcher.watch();
importer.listen();
