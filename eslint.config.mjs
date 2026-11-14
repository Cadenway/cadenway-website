import eslint from '@eslint/js';
import angular from 'angular-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import jsdoc from 'eslint-plugin-jsdoc';
import documentation from './rules/documentation.mjs';
import memberRegions from './rules/member-regions.mjs';

const signalFormsOnly = {
  name: '@angular/forms',
  importNames: ['ReactiveFormsModule', 'FormBuilder', 'FormGroup', 'FormControl'],
  message: 'Signal Forms only: use form() and [formField].',
};
const noSiblingSources = {
  regex: '\\.\\./cadenway-',
  message: 'Never import sibling sources: use the published @cadenway/* packages.',
};

// Packages the dependency review rejected, with what replaces each one. A sub-path import is
// refused too.
const rejectedPackages = [
  ['axios', 'The API is reached through @cadenway/api-client only.'],
  ['date-fns', 'It does not separate a plain date from an instant: dates use Temporal.'],
].map(([name, message]) => ({ regex: `^${name}(/|$)`, message }));

export default defineConfig(
  globalIgnores([
    'dist/',
    'coverage/',
    '.angular/',
    'docs/',
    '.claude/',
    '.codex/',
    'playwright-report/',
    'blob-report/',
    'test-results/',
  ]),
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'cw', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'cw', style: 'camelCase' },
      ],
      // Angular 22 style: `TaskRow`, not `TaskRowComponent`.
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/directive-class-suffix': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
      ],
      // Components, directives and services are classes that may only carry a decorator.
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      'no-restricted-imports': [
        'error',
        { paths: [signalFormsOnly], patterns: [noSiblingSources, ...rejectedPackages] },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportAllDeclaration',
          message: 'Use explicit named exports: a barrel hides what a feature exposes.',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
  },
  {
    files: ['**/*.mjs'],
    extends: [eslint.configs.recommended],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['src/**/*.ts'],
    plugins: { jsdoc, cadenway: { rules: { documentation, 'member-regions': memberRegions } } },
    linterOptions: { noInlineConfig: true },
    rules: {
      'cadenway/documentation': 'error',
      'cadenway/member-regions': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
      '@typescript-eslint/typedef': [
        'error',
        {
          variableDeclaration: true,
          memberVariableDeclaration: true,
          arrayDestructuring: true,
          objectDestructuring: true,
        },
      ],
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: { FunctionDeclaration: true, ClassDeclaration: true },
          contexts: [
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            'TSEnumDeclaration',
            'TSEnumMember',
            'Program > VariableDeclaration',
            'ExportNamedDeclaration[declaration.type="VariableDeclaration"]',
            'ClassDeclaration > ClassBody > PropertyDefinition',
            'ClassDeclaration > ClassBody > MethodDefinition',
            'ClassDeclaration > ClassBody > TSAbstractPropertyDefinition',
            'ClassDeclaration > ClassBody > TSAbstractMethodDefinition',
            'TSInterfaceBody > TSPropertySignature',
            'TSInterfaceBody > TSMethodSignature',
            'TSTypeAliasDeclaration > TSTypeLiteral > TSPropertySignature',
            'TSTypeAliasDeclaration > TSTypeLiteral > TSMethodSignature',
          ],
        },
      ],
      'jsdoc/require-param': [
        'error',
        {
          checkDestructured: false,
          checkDestructuredRoots: false,
          contexts: [
            'FunctionDeclaration',
            'VariableDeclarator > ArrowFunctionExpression',
            'MethodDefinition > FunctionExpression',
            'TSMethodSignature',
          ],
        },
      ],
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-returns': [
        'error',
        {
          contexts: [
            'FunctionDeclaration',
            'VariableDeclarator > ArrowFunctionExpression',
            'MethodDefinition > FunctionExpression',
            {
              context: 'TSMethodSignature[returnType.typeAnnotation.type!="TSVoidKeyword"]',
              forceRequireReturn: true,
            },
          ],
        },
      ],
      'jsdoc/require-returns-type': 'error',
      'jsdoc/require-returns-description': 'error',
    },
  },
  prettier,
);
