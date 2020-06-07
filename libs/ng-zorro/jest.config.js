module.exports = {
  name: 'ng-zorro',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ng-zorro',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
