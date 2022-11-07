/** @type {import("prettier").Config} */
module.exports = {
    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    printWidth: 80,
    tabWidth: 2,
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    importOrder: [
        '^next/(.*)$',
        '<THIRD_PARTY_MODULES>',
        '^components/(.*)$',
        '^utils/(.*)$',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
