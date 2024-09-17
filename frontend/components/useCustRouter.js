// useCustomRouter.js
import { useRouter } from 'next/navigation';
import getConfig from 'next/config';
import useStore from '@/components/stores/zstore';

import { default as feconfig } from '../frontendconfig.js';

const useCustRouter = () => {
  console.log('use reverseproxy? ', feconfig);
  if (!feconfig.useReverseProxy) {
    return useRouter();
  }

  const router = useRouter();
  const { basepath } = useStore();

  const customPush = (path, as, options) => {
    console.log('base path in cust router', basepath);
    const _basepath = router.basePath || basepath || '';
    console.log('_basepath in customPush?', _basepath);

    const targetPath = `${_basepath}${path}`
    console.log('path rewritten in useCustRouter', targetPath);
    router.push(`${_basepath}${path}`, as, options);
  };

  return {
    ...router,
    push: customPush,
  };
};

export default useCustRouter;
