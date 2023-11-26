import localforage from "localforage";

export const localforageConfig = () => {
  localforage.config({
    driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name: 'mirroflyDashboard',
    version: 1.0,
    storeName: 'imageBlob', // Should be alphanumeric, with underscores.
  });
};
