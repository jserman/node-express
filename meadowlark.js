import express from "express";
import handlebars from "express3-handlebars";
import getFortune from "./lib/fortune";
import getWeatherData from './public/javascript/getWeatherData';
import bodyParser from 'body-parser';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
const app = express();
const handlebar = handlebars.create({
    defaultLayout:'main',
    helpers:{
        section: function(name, options){
            if(!this._section) this._section = {};
            this._section[name] = options.fn(this);
            return null;
        }
    }
});

//使用body-parser中间件--主要用于解析post传输的内容
app.use(bodyParser());


//定义一些变量
//在app商设置一个表示端口号的常量
app.set('port', process.env.PORT || 5000);  

//为了支持handlebars视图引擎，需要添加如下的代码
app.engine('handlebars', handlebar.engine);
app.set('view engine', 'handlebars');
//设置静态资源的目录
app.use(express.static(__dirname + '/public'));

//添加测试路由
app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
})

/*//添加首页路由
app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('homepage');
})

//添加about路由
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('about page');
})

//定制404页面
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('page not founded');   
}) 

//定制500页面
app.use((req, res) => {
    res.type('text/plain');
    res.status(500);
    res.send('500 server erroring');
})*/

//这个中间件主要是用于我们是不是需要渲染

//设置一个获取天气的路由
app.use((req, res, next) => {
    if(!res.locals.particals) res.locals.particals = {};
    res.locals.particals.weather = getWeatherData();
    next();
})
//使用渲染视图的方式渲染模板
//渲染首页
app.get('/', (req, res) =>{
    res.render('home');
})

//渲染about页面
app.get('/about', (req, res) => {
    //这个方法的第二个参数就是我们需要在视图里面渲染的变量
    res.render('about', {
        fortunes:getFortune(),
        //同时我们需要为其指明视图中应该使用哪个页面的测试文件
        pageTestScript:'/qa/test-about.js'
    });
})

//渲染hood-river路由
app.get('/tours/hood-river', (req, res, next) => {
    res.render('tours/hood-river');
})

//渲染request-group-rate文件
app.get('/tours/request-group-rate', (req, res, next) =>{
    res.render('tours/request-group-rate');
})



//测试handlebars引擎
const context = {
    text:'这是一段text文本',
    html:'<h1>这是一段html文本</h1>',
    comment:'这是一段注释'
};
const block = {
    currency:{
        name:'United States dollars',
        abbrev:'USD'
    },
    tours:[
        {name:'Hood River', price:'$99.95'},
        {name:'Oregon Coast', price:'$159.95'}
    ],
    specialUrl:'/january-specials',
    currencies:['USD','GBP','BTC']
};
app.get('/handlebars', (req, res, next) => {
    //res.render('handlebars',context);
    res.render('handlebars',block);
})

//渲染表单页面
app.get('/newsletter', (req, res, next) => {
    res.render('newsletter', {csrf:'CSRF token goes here'});
})

//解析表单的内容
app.post('/process',(req, res) => {
    if(req.xhr || req.accepts('json, html') === 'json'){
        res.send({"success":true});
    }else{
        console.log('get message from client',JSON.stringify(req.query));
        console.log('get from the post ',JSON.stringify(req.body));
        res.redirect(303, '/thank-you');
    }
})

//处理文件上传的路由
app.get('/contest/vacation-photo', (req, res, next) => {
    const now = new Date();
    res.render('contest/vacation-photo', {
        year:now.getFullYear(),
        month:now.getMonth()
    })
})

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    //利用上面的formidable中间件处理文件上传
    const form = new formidable.IncomingForm();
    //重新设置tmp路径
    form.uploadDir = './public/tmp';
    //利用parse方法解析文件上传的内容
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.redirect(303, '/error');
        }
        const ext = path.extname(files.file.name);
        const filepath = path.normalize( __dirname + `/public/img/${req.params.year}-${req.params.month}${ext}`);
        console.log('get filds ', fields);
        console.log('get files ', files.file.path);
        
        fs.rename(path.normalize(files.file.path), filepath, (err) => {
            //这个报错了
            if(!err){
                res.redirect(303, '/thank-you');
            }else{
                console.log(err);
                res.render('error');
            }
        });
    })
})

app.get('/error', (req, res, next) =>{
    res.render('error');
})


app.get('/thank-you', (req, res, next) => {
    res.render('thank-you');
})

//jquerytest路由
app.get('/jquerytest', (req, res, next) => {
    res.render('jquerytest');
})

//不使用路由的情况
app.get('/no-route', (req, res, next) => {
    res.render('noRoute',{layout:null, name:'jerman'});
})

//不使用自定义的模板，使用一个自己定义的模板
app.get('/self-view', (req, res, next) => {
    res.render('self', {layout:'selfViews',body:'这是body的内容'});
})



























//渲染404页面
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
})

//渲染500页面
app.use((err, req, res, next) => {
    res.status(500);
    res.render('500');
})


//监听端口
app.listen(app.get('port'), () => {
    console.log(`the server is running on the port ${app.get('port')}`);
})