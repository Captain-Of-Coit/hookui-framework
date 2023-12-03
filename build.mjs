import * as esbuild from 'esbuild'

console.log('starting server at localhost:8000')

let ctx = await esbuild.context({
  entryPoints: ['src/dev-env.jsx'],
  bundle: true,
  outfile: 'dev-env/dist/dev-bundle.js',
})

let { host, port } = await ctx.serve({
  servedir: 'dev-env',
})