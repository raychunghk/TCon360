// useCustomRouter.js
import { useRouter } from 'next/navigation';

import getConfig from 'next/config';
import useStore from '@/components/stores/zstore';
const useCustRouter = () => {
  const router = useRouter();
  const conf = getConfig();
  console.log('config?', conf);

  const { basepath, setBasepath } = useStore();

  console.log('baseconfig base.path', basepath);
  console.log('router basepath?', router.basePath);
  const customPush = (path, as, options) => {
    const resolvedPath = router.basePath ? `${router.basePath}${path}` : `${basepath}${path}`;
    console.log('resolvedPath', resolvedPath);
    router.push(resolvedPath, as, options);
  };

  return {
    ...router,
    push: customPush,
  };
};

export default useCustRouter;
