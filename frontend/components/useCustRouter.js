// useCustomRouter.js
import { useRouter } from 'next/navigation';
import getConfig from 'next/config';
import useStore from '@/components/stores/zstore';

const useCustRouter = () => {
  const router = useRouter();
  const { basepath } = useStore();

  const customPush = (path, as, options) => {
    const _basepath = router.basePath || basepath || '';
    console.log('_basepath in customPush?', _basepath);
    router.push(`${_basepath}${path}`, as, options);
  };

  return {
    ...router,
    push: customPush,
  };
};

export default useCustRouter;
