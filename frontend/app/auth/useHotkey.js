import { useEffect } from 'react';
import { getHotkeyHandler } from '@mantine/hooks';

const useHotkey = (hotkey, handler) => {
  useEffect(() => {
    const hotkeyHandler = getHotkeyHandler([[hotkey, handler]]);
    document.addEventListener('keydown', hotkeyHandler);

    return () => {
      document.removeEventListener('keydown', hotkeyHandler);
    };
  }, [hotkey, handler]);
};

export default useHotkey;