import * as migration_20260410_071608 from './20260410_071608';

export const migrations = [
  {
    up: migration_20260410_071608.up,
    down: migration_20260410_071608.down,
    name: '20260410_071608'
  },
];
