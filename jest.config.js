/**
 * Jest configuration for TypeScript using ts-jest
 */

export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const roots = ['<rootDir>/src'];
export const testMatch = ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'];
export const moduleFileExtensions = ['ts', 'js', 'json', 'node'];
