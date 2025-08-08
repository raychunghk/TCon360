'use client';

import useStore from '@/components/stores/zstore';
import { useRouter } from 'next/navigation';

const useCustRouter = () => {
  const router = useRouter();
  const { basepath, useReverseProxy } = useStore();

  //console.log('useReverseProxy in useCustRouter:', useReverseProxy);

  if (!useReverseProxy) {
    return router;
  }

  const customPush = (path, as, options) => {
    console.log('base path in cust router', basepath);
    const _basepath = router.basePath || basepath || '';
    console.log('_basepath in customPush?', _basepath);

    const targetPath = `${_basepath}${path}`;
    console.log('path rewritten in useCustRouter', targetPath);
    router.push(targetPath, as, options);
  };

  return {
    ...router,
    push: customPush,
  };
};

export default useCustRouter;