import {spawn} from 'child_process';
import {assert} from 'chai';
import axios from 'axios';

describe('server', function() {
    this.timeout(10000);

    let serverProcess;

    beforeEach(() => {
        return new Promise((resolve, reject) => {
            serverProcess = spawn('npm', ['start']);

            serverProcess.stdout.setEncoding('utf8');
            serverProcess.stderr.setEncoding('utf8');

            serverProcess.stderr.on('data', function(data) {
                console.log('[server]', data.toString());
            });

            serverProcess.stdout.on('data', function(data) {
                var line = data.toString();

                console.log('[server]', line);

                if (line.indexOf('Server running') !== -1)
                    resolve();
            });
        });
    });

    it('description', async () => {
        const response = await axios({
            method: 'post',
            url: 'http://127.0.0.1:1334',
            data: {
                pieces: [{
                    piece: 'Q',
                    square: 'b4'
                }],
                activeTurn: 'w',
                playerColor: 'w'
            }
        });

        assert.equal(response.status, 200);
        assert.deepEqual(response.data, {
            from: 'b4',
            to: 'b2'
        });
    });
});
