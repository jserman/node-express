import fortune from '../../lib/fortune';
import {expect} from 'chai';

suite('Fortune cookie tests', () => {
    test('getFortune() should return a fortune', () => {
        expect(typeof fortune.getFortune() === 'string');
    })
})
