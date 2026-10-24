import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'public/vision/wasm/**', '.checkpoints/**'] },
  { files: ['scripts/*.mjs'], languageOptions: { globals: { URL: 'readonly', fetch: 'readonly', AbortSignal: 'readonly' } } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
