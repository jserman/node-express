import nodemon from "nodemon";
//测试nodemon模块
nodemon({
    script:'meadowlark.js',
    ext:'js json'
})

nodemon.on('start', () =>{
    console.log('the programming is starting');
}).on('quit', () => {
    console.log('App has quit');
}).on('restart', (files) => {
    console.log('App restarted due to',files);
})

