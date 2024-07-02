import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

import router from '@/router';

NProgress.configure({ showSpinner: false });

router.beforeEach(async (_to:any, _from:any, next) => {
  NProgress.start();
  next()
  NProgress.done();
});

router.afterEach((_to:any) => {
  NProgress.done();
});
