/* next.module.ts */

import { Module } from '@nestjs/common';
import { NextService } from './next.service';
import next from 'next';
/*
type NextServerConstructor = Omit<ServerConstructor, 'staticMarkup'> & {
  dev?: boolean;
};
*/
@Module({
  providers: [NextService],
  exports: [NextService],
})
export class NextModule {
  constructor(private readonly next: NextService) {}

  public async prepare() {
    const app = next(
      Object.assign(
        {
          dev: process.env.NODE_ENV !== 'production',
          dir: process.cwd(),
        },
        //  options || {},
      ),
    );
    return app.prepare().then(() => this.next.setApp(app));
  }
}
