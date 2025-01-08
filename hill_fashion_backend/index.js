const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
const { json } = require("stream/consumers");

app.use(express.json());
app.use(cors());

// Kết nối database với MongoDB
mongoose.connect("mongodb+srv://duchq63cntt:duchq63cntt@cluster0.orvdm.mongodb.net/e-commerce");

// Tạo API

app.get("/",(req,res)=>{
    res.send("Express App is Running")
});

// Lưu hình ảnh

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage:storage});

// Upload hình ảnh

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'Không có tệp nào được tải lên' });
    }

    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

//app.post("/upload",upload.single('product'),(req,res)=>{
    //res.json({
        //success:1,
        //image_url:`http://localhost:${port}/images/${req.file.filename}`
    //})
//});

// Tạo sản phẩm

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    avilable:{
        type: Boolean,
        default: true,
    },
})
// Thêm sản phẩm
app.post('/addproduct', async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Xóa sản phẩm

app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Tạo API để lấy tất cả sản phẩm
app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({});
    console.log("Tất cả sản phẩm đã được lấy");
    res.send(products);
})

//  Tạo schema cho mô hình người dùng

const Users = mongoose.model('Users',{
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// Tạo endpoint để đăng ký người dùng
app.post('/signup', async(req,res)=>{
    let check = await Users.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({success: false, error:"Đã tìm thấy người dùng tồn tại với cùng địa chỉ email"})
    }
    let cart = {};
    for(let i=0; i<300; i++){
        cart[i]=0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user:{
            id: user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success: true, token})
})

// Tạo endpoint cho chức năng đăng nhập người dùng
app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email: req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success: true, token})
        }
        else{
            res.json({success: false,error:"Sai mật khẩu"});
        }
    }
    else{
        res.json({success: false,error:"Sai địa chỉ email"});
    }
})

// Tạo endpoint cho bộ sưu tập mới
app.get('/newcollections', async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("Đã lấy dữ liệu bộ sưu tập mới");
    res.send(newcollection);
    
})

// Tạo endpoint cho sản phẩm phổ biến ở nữ
app.get('/popularinwomen', async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Sản phẩm phổ biến ở nữ đã được lấy");
    res.send(popular_in_women);
    
})

// Tạo endpoint cho sản phẩm liên quan theo danh mục
app.get('/relatedproducts/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const relatedProducts = await Product.find({ category });
        const limitedProducts = relatedProducts.slice(0, 4);
        console.log(`Sản phẩm liên quan đến ${category} đã được lấy`);
        res.status(200).send(limitedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Đã xảy ra lỗi khi lấy sản phẩm liên quan.");
    }
});


// Tạo middleware để lấy thông tin người dùng
const fetchUser =  async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Vui lòng xác thực token hợp lệ"})
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch(error){
            res.status(401).send({error:"Vui lòng xác thực token hợp lệ"})
        }
    }
}

// Tạo endpoint để thêm sản phẩm giỏ hàng
app.post('/addtocart',fetchUser , async(req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

// Tạo endpoint để xóa sản phẩm khỏi giỏ hàng
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

//Tạo endpoint để lấy dữ liệu giỏ hàng
app.post('/getcart', fetchUser, async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

//

app.listen(port,(error)=>{
    if (!error){
        console.log("Server Running on Port "+port)
    }else{
        console.log("Error: "+error)
    }
});