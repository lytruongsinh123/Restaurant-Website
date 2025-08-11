module.exports = {
  // Sử dụng parser của TypeScript để phân tích cú pháp code
  parser: '@typescript-eslint/parser',

  // Cấu hình cho parser
  parserOptions: {
    project: 'tsconfig.json', // Đường dẫn tới file tsconfig
    tsconfigRootDir: __dirname, // Thư mục gốc của tsconfig
    sourceType: 'module', // Sử dụng module (import/export)
  },

  // Khai báo các plugin sử dụng
  plugins: ['@typescript-eslint/eslint-plugin'],

  // Kế thừa các cấu hình rule có sẵn
  extends: [
    'plugin:@typescript-eslint/recommended', // Rule chuẩn cho TypeScript
    'plugin:prettier/recommended', // Rule chuẩn hóa code với Prettier
  ],

  // Đánh dấu đây là file cấu hình gốc
  root: true,

  // Thiết lập môi trường (Node.js, Jest)
  env: {
    node: true,
    jest: true,
  },

  // Bỏ qua kiểm tra file .eslintrc.js
  ignorePatterns: ['.eslintrc.js'],

  // Tùy chỉnh các rule
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off', // Không bắt buộc interface phải có tiền tố I
    '@typescript-eslint/explicit-function-return-type': 'off', // Không bắt buộc khai báo kiểu trả về hàm
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Không bắt buộc khai báo kiểu trả về module
    '@typescript-eslint/no-explicit-any': 'off', // Cho phép dùng kiểu any
  },
};
