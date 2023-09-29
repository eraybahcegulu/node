# node-chat
```
_______________________________________________________
*app.js*

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public/html')));
app.use(express.static(path.join(__dirname, 'public/css')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'public/html', 'login.html'));
})
_______________________________________________________
*login.html*

x <link href="public/css/bootstrap.min.css" rel="stylesheet"> x
<link href="bootstrap.min.css" rel="stylesheet">
_________________________________________________________
```
