const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	// react-aria is not yet compatible with strict mode, see:
	// - https://github.com/adobe/react-spectrum/issues/2231
	// - https://github.com/adobe/react-spectrum/issues/779
	reactStrictMode: false,
	swcMinify: true,
	output: 'standalone',
	eslint: {
		dirs: ['pages', 'components', 'lib', 'cypress'],
	},
	// Note we're not using the Next compiler (SWC) at the moment because we need babel for the theme
	// transformations, but leaving this here in case we change that in future.
	compiler: {
		styledComponents: true,
	},
	// When linking locally the external library has its own node_modules installed, and
	// so ends up using multiple instances, which causes problems for certain libraries.
	// e.g. StyledComponents doesn't pick up the theme correctly:
	// https://styled-components.com/docs/faqs#why-am-i-getting-a-warning-about-several-instances-of-module-on-the-page
	webpack: (config) => {
		config.resolve.alias['styled-components'] = path.resolve(
			'./node_modules/styled-components',
		);
		config.resolve.alias['react'] = path.resolve('./node_modules/react');
		config.resolve.alias['react-dom'] = path.resolve(
			'./node_modules/react-dom',
		);
		config.resolve.alias['react-aria'] = path.resolve(
			'./node_modules/react-aria',
		);
		config.resolve.alias['react-stately'] = path.resolve(
			'./node_modules/react-stately',
		);
		return config;
	},
};

const withTranspiledModules = require('next-transpile-modules')([]);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE_BUNDLE === 'true',
});

module.exports = withBundleAnalyzer(withTranspiledModules(nextConfig));
