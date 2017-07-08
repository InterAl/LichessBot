import toFen from './toFen';
import {assert} from 'chai';

describe('toFen', () => {
    it('convert the client pieces data to FEN', () => {
        const pieces = [{
            piece: 'K',
            square: 'c1'
        },{
            piece: 'R',
            square: 'd1'
        },  {
            piece: 'R',
            square: 'h1'
        }, {
            piece: 'P',
            square: 'a2'
        }, {
            piece: 'P',
            square: 'b2'
        }, {
            piece: 'P',
            square: 'c2'
        }, {
            piece: 'P',
            square: 'f2'
        }, {
            piece: 'P',
            square: 'g2'
        }, {
            piece: 'P',
            square: 'h2'
        }, {
            piece: 'N',
            square: 'c3'
        }, {
            piece: 'B',
            square: 'e3'
        }, {
            piece: 'Q',
            square: 'b5'
        }, {
            piece: 'N',
            square: 'd5'
        }, {
            piece: 'p',
            square: 'c5'
        }, {
            piece: 'r',
            square: 'e5'
        }, {
            piece: 'p',
            square: 'd6'
        }, {
            piece: 'n',
            square: 'f6'
        }, {
            piece: 'p',
            square: 'h6'
        }, {
            piece: 'p',
            square: 'a7'
        }, {
            piece: 'p',
            square: 'c7'
        }, {
            piece: 'p',
            square: 'g7'
        }, {
            piece: 'k',
            square: 'c8'
        }, {
            piece: 'r',
            square: 'e8'
        }];

        assert.equal(toFen(pieces), '2k1r3/p1p3p1/3p1n1p/1QpNr3/8/2N1B3/PPP2PPP/2KR3R');
    });
});
