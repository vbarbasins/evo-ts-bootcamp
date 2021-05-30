import { EventEmitter } from 'events';

import { DirWatcher } from './modules/dirWatcher';
import { Importer } from './modules/importer';

const PATH_TO_DATA = './data';

const eventEmitter = new EventEmitter();
const dirWatcher = new DirWatcher(eventEmitter, PATH_TO_DATA);
const importer = new Importer(eventEmitter, PATH_TO_DATA);

dirWatcher.watch();
importer.listen();
