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

app.listen(port,(error)=>{
    if (!error){
        console.log("Server Running on Port "+port)
    }else{
        console.log("Error: "+error)
    }
});