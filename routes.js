import express from 'express';
import * as user from "./controller/user";
import * as business from "./controller/business";
import * as product from "./controller/product";
import multer from 'multer';
// to upload single file  
var uploader = multer({
    dest: 'upload/'
});

const app = express();

app.post('/user', uploader.single('profilePic'), user.create);
app.get('/user/:email', user.get);

app.post('/business/:userId', business.create);
app.get('/business/:registrationNo', business.get);

app.post('/product', uploader.single('image[2]'), product.create);
app.get('/product/:productId', product.get);
app.put('/product/:productId', uploader.single('image[2]'), product.update);
app.delete('/product/:productId', product.remove);

export default app;
