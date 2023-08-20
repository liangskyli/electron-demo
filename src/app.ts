import { renderLogger } from '@/common/logger/renderer';
import { defineApp } from '@umijs/max';

renderLogger();
console.log('renderLogger:', { renderLogger: 1 });

export default defineApp({
  dva: {
    config: {
      onError(err: any) {
        console.error(err);
      },
    },
  },
});
