# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Develop]

### Added

- added `custom_id_function` as parameter ([#2])
- added example for `custom_id_function` in README.md
- added '[husky](https://www.npmjs.com/package/husky)' as dev. dependency

### Fixed

- link for 1.1.0 compare in CHANGELOG.md
- github workflow 'npm-publish.yml'

## [1.1.0] (2020-11-03)

### Added

- documented library (simple)
- refactor README.md
- added license information on top of each file
- added `start, increment_name, increment_step` as parameter to library
- added test
- shrunk down library file size

### Changed

- removed '[isArray](https://www.npmjs.com/package/isarray)' as dependency

## 1.0.0 (2020-10-30)

### Added

- added 'isarray' and 'isobject' as dependencies
- added 'jest' as dev.-dependency
- added 'formatter'
- added tests for <b>only one</b> of the three branches from the formatter

[#2]: https://github.com/LetsMelon/addIdToArray/issues/2

[develop]: https://github.com/LetsMelon/addIdToArray/compare/main...develop
[1.1.0]: https://github.com/LetsMelon/addIdToArray/compare/v1.0.0...v1.1.0
