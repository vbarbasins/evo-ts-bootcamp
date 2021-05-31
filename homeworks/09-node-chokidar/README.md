# Homework 09-node-chokidar

dirWatcher watches file name changes and emits event with added/removed files (includes renaming)

importer listens to the event and tries to get new data from files which was included into the event: 
- about file deletion notified in console
- data from added files emitted with new event

added for demo: app listens to the importer event emition and consoles out received objects