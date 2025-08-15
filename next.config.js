/** @type {import('next').NextConfig} */

const nextPkg = require('next/package.json');
const nextMajorVersion = Number(String(nextPkg.version).split('.')[0]);

const nextConfig = {
	images: {
		domains: ['images.unsplash.com'],
	},
};

if (process.env.NEXT_PUBLIC_TEMPO) {
	if (nextMajorVersion === 14) {
		nextConfig["experimental"] = {
			// NextJS 13.4.8 up to 14.1.3:
			// swcPlugins: [[require.resolve("tempo-devtools/swc/0.86"), {}]],
			// NextJS 14.1.3 to 14.2.11:
			swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]],
		};
	} else {
		console.warn(
			`[tempo-devtools] SWC plugin not enabled: Next.js ${nextPkg.version} detected (major ${nextMajorVersion}). Support for 15+ is not yet available.`
		);
	}
}

module.exports = nextConfig;