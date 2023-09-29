import express from 'express'
import bodyParser from 'body-parser';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword } from "firebase/auth";
import { fileURLToPath } from 'url';

const firebaseConfig = {
    apiKey: "AIzaSyDmbhhBqZXepSP56WCrHnB82XGAUebSO4o",
    authDomain: "node-chatx.firebaseapp.com",
    databaseURL: "https://node-chatx-default-rtdb.firebaseio.com",
    projectId: "node-chatx",
    storageBucket: "node-chatx.appspot.com",
    messagingSenderId: "345839296843",
    appId: "1:345839296843:web:1383d82db9d2692f0708ce"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

const app = express();
const port = 3000
app.use(bodyParser.json());

app.set('view engine', 'ejs');

//import.meta.url ile __filename __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public/html')));
app.use(express.static(path.join(__dirname, 'public/css')));
app.set('views', path.join(__dirname, 'public/views'));

async function registerUser(email, password, res) {
  try {
    const auth = getAuth();

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const successMessage = 'success register';
    res.render('register/register_success', { success: successMessage });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kullanıcı oluşturulamadı.' });
  }
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'public/html', 'login.html'));
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname,'public/html', 'register.html'));
})

app.post('/register', async (req, res) => {
  await registerUser(req.body.email, req.body.password, res);
});
  
  app.post('/', async (req, res) => {
    try {

      const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
      const user = userCredential.user;
  
      res.json(user);
    } catch (error) {
      console.error(error);
      const errorMessage = 'Login Error';
        res.render('login/login_error', { error: errorMessage });
    }
  });

app.listen(port, ()=>{
    console.log(`Application running on port: http://localhost:${port}`);
})

