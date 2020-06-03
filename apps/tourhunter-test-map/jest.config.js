module.exports = {
  name: 'tourhunter-test-map',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/tourhunter-test-map',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
