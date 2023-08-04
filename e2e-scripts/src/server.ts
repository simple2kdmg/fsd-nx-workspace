import * as express from 'express';
import { join } from 'path';

const { port, baseHref, staticFolder } = process.env;

if (!port) {
    throw new Error('port is not defined.');
}
if (!baseHref) {
    throw new Error('baseHref is not defined.');
}
if (!staticFolder) {
    throw new Error('staticFolder is not defined.');
}

console.log(`baseHref: ${baseHref}, staticFolder: ${staticFolder}`);

const app = express();

const rootFolder = join(__dirname, '..');

app.use(baseHref, express.static(staticFolder));

app.get('*', function (req, res) {
    res.sendFile(join(rootFolder, staticFolder, 'index.html'));
});

app.listen(port, () => {
    console.log(`Application was hosted on port: ${port}`);
    console.log(
        `Index file is: ${join(rootFolder, staticFolder, 'index.html')}`
    );
});
