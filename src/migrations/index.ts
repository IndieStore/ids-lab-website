import * as migration_20260410_071608 from './20260410_071608';
import * as migration_20260418_125905 from './20260418_125905';

export const migrations = [
  {
    up: migration_20260410_071608.up,
    down: migration_20260410_071608.down,
    name: '20260410_071608',
  },
  {
    up: migration_20260418_125905.up,
    down: migration_20260418_125905.down,
    name: '20260418_125905'
  },
];
