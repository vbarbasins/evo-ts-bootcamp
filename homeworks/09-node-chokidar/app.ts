import { EventEmitter } from 'events';

import { DirWatcher } from './modules/dirWatcher';
import { Importer } from './modules/importer';

const PATH_TO_DATA = './data';
const EXT_TO_WATCH = 'CSV';

const eventEmitter = new EventEmitter();
const dirWatcher = new DirWatcher(eventEmitter, PATH_TO_DATA, EXT_TO_WATCH);
const importer = new Importer(eventEmitter, PATH_TO_DATA);

dirWatcher.watch();
importer.listen();
