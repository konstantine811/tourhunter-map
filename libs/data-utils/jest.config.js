module.exports = {
  name: 'data-utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-utils',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
