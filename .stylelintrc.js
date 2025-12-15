module.exports = {
	processors: [
		[
    	'@mapbox/stylelint-processor-arbitrary-tags',
			{
				fileFilterRegex: [/\.vue$/],
			},
		],
	],
  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
  ],
	extends: [
    'stylelint-config-rational-order',
    'stylelint-stylus/standard',
  ],
	rules: {
		'no-empty-first-line': null,
		'no-empty-source': null,
    'stylus/number-leading-zero': 'never',
    'stylus/no-eol-whitespace': null,
    'order/properties-order': [],
    'plugin/rational-order': [true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': false,
      },
    ],
	},
};