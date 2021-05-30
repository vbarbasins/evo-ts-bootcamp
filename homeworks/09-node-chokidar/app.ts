import { EventEmitter } from 'events';

import { DirWatcher } from './modules/dirWatcher';

const eventEmitter = new EventEmitter();
const dirWatcher = new DirWatcher(eventEmitter);

dirWatcher.watch('./data');

eventEmitter.addListener('dirwatcher:changed', () => {
  console.log('DirWatcher emitted event: "dirwatcher:changed"');
});
