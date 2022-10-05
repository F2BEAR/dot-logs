import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';
import license from 'rollup-plugin-license';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'lib/index.mjs',
				format: 'es',
				exports: 'named',
			},
			{
				file: 'lib/index.js',
				format: 'cjs',
				exports: 'default'
			},
			
		],
		external: ['winston', 'path'],
		plugins: [
			license({
				banner:
					'Copyright (c) 2022 Facundo Carbonel / Dot-Logs\n\nThis source code is licensed under the MIT license found in the\nLICENSE file in the root directory of this source tree.',
			}),
			cleanup({ comments: 'license' }),
			process.env.NODE_ENV === 'production' &&
				terser({
					output: {
						comments: true,
					},
				}),
			typescript({ tsconfig: './tsconfig.json' }),
		],
	},
];
