// Register ts-node with inline compiler options to avoid reading root tsconfig
const tsnode = require('ts-node');
tsnode.register({
  transpileOnly: true,
  compilerOptions: {
    module: 'NodeNext',
    moduleResolution: 'NodeNext',
    esModuleInterop: true,
    skipLibCheck: true,
    strict: false
  }
});
require('./seed.ts');
