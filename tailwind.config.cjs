const defaultTheme = require('tailwindcss/defaultTheme');

function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`;
		}
		return `rgb(var(${variable}) / ${opacityValue})`;
	};
}

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Roboto', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				primary: withOpacityValue('--color-primary'),
				background: withOpacityValue('--color-background')
			}
		}
	},

	plugins: []
};

module.exports = config;
