
import { useRouter } from 'next/router';

import useStore from '@/components/stores/zstore.js';

const CustomLink = ({ href, children, ...props }) => {
  const { setMainshellOverlayVisible } = useStore();
  const router = useRouter();

  const handleClick = () => {
    setMainshellOverlayVisible(true); // Show overlay
    router.push(href).then(() => {
      // Hide overlay after navigation is done
      setMainshellOverlayVisible(false);
    });
  };

  return (
    <span onClick={handleClick} style={{ cursor: 'pointer' }} {...props}>
      {children}xx
    </span>
  );
};

export default CustomLink;