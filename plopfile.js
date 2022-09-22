const logSymbols = require('log-symbols');

/**
 * REQUIRED: Install plop as global command: npm install -g plop
 *
 * To CREATE component:
 * go to folder which you want to create the component and run:
 * "plop component" and follow the instructions
 *
 * To CREATE store:
 * go to folder store and run:
 * "plop store" and follow the instructions
 *
 * To CREATE ONLY i18n folder with relative file:
 * go to folder and run:
 * "plop i18n"
 */

const inputRequired = name => {
    return value => (/.+/.test(value) ? true : `${name} is required`)
};

module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'Create a new component',
        prompts: [
            {
                type: 'input',
                name: 'componentName',
                message: 'What is the name of your component? example for MyComponent write myComponent',
                validate: inputRequired('componentName')
            },
            {
                type: 'list',
                name: 'typeOfComponent',
                message: 'Choose the type of component',
                default: 'none',
                choices: [
                    {name: `${logSymbols.success} With i18n folder`, value: 'A'},
                    {name: `${logSymbols.error} Without i18n folder`, value: 'B'}
                ],
            }],
        actions: data => {
            let actions = [];
            switch (data.typeOfComponent) {
                case 'A':
                    actions = [
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/{{camelCase componentName}}.component.tsx',
                            templateFile: 'plop-templates/component/componentWithI18n.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/i18n/it.json',
                            templateFile: 'plop-templates/component/i18n.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/i18n/en.json',
                            templateFile: 'plop-templates/component/i18n.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/i18n/de.json',
                            templateFile: 'plop-templates/component/i18n.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/i18n/es.json',
                            templateFile: 'plop-templates/component/i18n.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/i18n/fr.json',
                            templateFile: 'plop-templates/component/i18n.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/i18n/nl.json',
                            templateFile: 'plop-templates/component/i18n.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/i18n/sv.json',
                            templateFile: 'plop-templates/component/i18n.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/{{componentName}}.scss',
                            templateFile: 'plop-templates/component/style.hbs'
                        }
                    ];
                    break;
                case 'B':
                    actions = [
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/{{camelCase componentName}}.component.tsx',
                            templateFile: 'plop-templates/component/component.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{componentName}}/{{componentName}}.scss',
                            templateFile: 'plop-templates/component/style.hbs'
                        }
                    ];
                    break;
            }
            return actions
        }
    });
    plop.setGenerator('store', {
        description: 'Create a new store',
        prompts: [
            {
                type: 'input',
                name: 'store',
                message: 'What is the name of your store? example for MyStore write myStore',
                validate: inputRequired('store')
            },
            {
                type: 'list',
                name: 'typeOfStore',
                message: 'Choose the type of store',
                default: 'none',
                choices: [
                    {name: `${logSymbols.info} With action and reducer`, value: 'A'},
                    {name: `${logSymbols.info} With slice`, value: 'B'}
                ],
            }],
        actions: data => {
            let actions = [];
            switch (data.typeOfStore) {
                case 'A':
                    actions = [
                        {
                            type: 'add',
                            path: process.cwd() + '/{{store}}/{{camelCase store}}.action.ts',
                            templateFile: 'plop-templates/store/action.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{store}}/{{camelCase store}}.reducer.ts',
                            templateFile: 'plop-templates/store/reducer.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{store}}/types.ts',
                            templateFile: 'plop-templates/store/types.hbs'
                        }
                    ];
                    break;
                case 'B':
                    actions = [
                        {
                            type: 'add',
                            path: process.cwd() + '/{{store}}/{{camelCase store}}.slice.ts',
                            templateFile: 'plop-templates/store/slice.hbs'
                        },
                        {
                            type: 'add',
                            path: process.cwd() + '/{{store}}/types.ts',
                            templateFile: 'plop-templates/store/types.hbs'
                        }
                    ];
                    break;
            }
            return actions
        }
    });
    plop.setGenerator('i18n', {
        description: 'Create i18n folder',
        prompts:[],
        actions: data => {
            return [
                {
                    type: 'add',
                    path: process.cwd() + '/i18n/it.json',
                    templateFile: 'plop-templates/component/i18n.hbs'
                },
                {
                    type: 'add',
                    path: process.cwd() + '/i18n/en.json',
                    templateFile: 'plop-templates/component/i18n.hbs'
                },
                {
                    type: 'add',
                    path: process.cwd() + '/i18n/de.json',
                    templateFile: 'plop-templates/component/i18n.hbs'
                },
                {
                    type: 'add',
                    path: process.cwd() + '/i18n/es.json',
                    templateFile: 'plop-templates/component/i18n.hbs'
                },
                {
                    type: 'add',
                    path: process.cwd() + '/i18n/fr.json',
                    templateFile: 'plop-templates/component/i18n.hbs'
                },
                {
                    type: 'add',
                    path: process.cwd() + '/i18n/nl.json',
                    templateFile: 'plop-templates/component/i18n.hbs'
                },
                {
                    type: 'add',
                    path: process.cwd() + '/i18n/sv.json',
                    templateFile: 'plop-templates/component/i18n.hbs'
                }
            ];

        }
    });
};
