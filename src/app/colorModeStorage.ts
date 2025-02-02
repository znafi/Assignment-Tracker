import { StorageManager } from '@chakra-ui/color-mode'

const storageKey = 'chakra-ui-color-mode'

export const colorModeManager: StorageManager = {
  get: () => 'dark',
  set: () => {},
  type: 'cookie',
}
