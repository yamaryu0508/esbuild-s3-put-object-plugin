# esbuild-s3-put-object-plugin

# Sample esbuild `build.js`

```:js
import { typecheckPlugin } from '@jgoz/esbuild-plugin-typecheck';
import { build } from 'esbuild';
import s3PutObjectPlugin from 'esbuild-s3-put-object-plugin';

await build({
  entryPoints: ['./src/ts/desktop.tsx', './src/ts/mobile.tsx', './src/ts/config.tsx'],
  outdir: 'dist/js',
  plugins: [
    typecheckPlugin(),
    s3PutObjectPlugin({
      Region: 'us-west-1',
      Bucket: 'kintone-plugin-bucket',
      Key: 'plug-in/js/desktop.js',
      FilePath: './dist/js/desktop.js'
    }),
    s3PutObjectPlugin({
      Region: 'us-west-1',
      Bucket: 'kintone-plugin-bucket',
      Key: 'plug-in/js/mobile.js',
      FilePath: './dist/js/mobile.js'
    }),
    s3PutObjectPlugin({
      Region: 'us-west-1',
      Bucket: 'kintone-plugin-bucket',
      Key: 'plug-in/js/config.js',
      FilePath: './dist/js/config.js'
    })
  ],
  bundle: true,
  minify: true,
  target: 'es2020',
  jsx: 'automatic',
  jsxImportSource: '@emotion/react',
  watch: {
    onRebuild(error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log(`esbuild rebuilt. ${JSON.stringify(result)}`);
      }
    }
  }
});
```