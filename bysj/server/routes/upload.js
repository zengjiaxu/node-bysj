const router = require('koa-router')()
const fs = require('fs');
const path = require('path');

//图片上传
router.post('/upload',(ctx,next)=>{
    const file = ctx.request.files.file // 上传的文件在ctx.request.files.file
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 修改文件的名称
    var myDate = new Date();
    var newFilename = myDate.getTime()+'.'+file.name.split('.')[1];
    var targetPath = path.join(__dirname, '../public/uploads/') + `/${newFilename}`;
    //创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    //返回保存的路径
    ctx.body = { code: 200, data: { url: 'http://' + ctx.headers.host + '/uploads/' + newFilename } };
  })

  module.exports = router