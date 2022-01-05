import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { merge } from 'webpack-merge';
import common from '../webpack.common';

export default merge(common, {
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './manifest_chrome.json', to: './manifest.json' },
            ],
        }),
    ],
    output: { filename: '[name].js', path: path.resolve(__dirname, '../../dist/chrome/') },
});
