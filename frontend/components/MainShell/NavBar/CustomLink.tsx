import { useRouter } from 'next/router';

import useStore from '@/components/stores/zstore.ts';

import * as classes from './CustomLink.css';

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
    <span onClick={handleClick} className={classes.link} {...props}>
      {children}xx
    </span>
  );
};

export default CustomLink;
