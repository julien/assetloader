require('isomorphic-fetch');
const fetchMock = require('fetch-mock');
const pkgFile = require('../package.json');

import loader from '../loader';


test('should load json files', () => {
  fetchMock.mock('package.json', pkgFile);

  return loader.json('package.json')
    .then(res => {
      expect(res[0]).toBeDefined();
      expect(res[0]).toEqual(pkgFile);
    });
});

test('should fail if json file doesn\'t exist', () => {
  fetchMock.mock('nope.json', {
    throws: 'File nope.json not found'

  });

  return loader.json('nope.json')
    .catch(err => {
      expect(err).toEqual('File nope.json not found');
    });
});

test('should load text files', () => {
  fetchMock.mock('file.html', '<!doctype html><html></html>');

  return loader.text('file.html')
    .then(res => {
      expect(res[0]).toBeDefined();
      expect(typeof res[0]).toEqual('string');
    });
});

test('should fail if text file doesn\'t exist', () => {
  fetchMock.mock('nope.html', {
    throws: 'File nope.html not found'

  });

  return loader.text('nope.html')
    .catch(err => {
      expect(err).toEqual('File nope.html not found');
    });
});

