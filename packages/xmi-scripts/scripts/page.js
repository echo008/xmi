const path = require('path')
const ejs = require('ejs')
const fs = require('fs-extra')

const args =  process.argv.slice(2)
// 目标相对文件位置
const filePath = args[0]

const appDirectory = fs.realpathSync(process.cwd())
const viewPath = path.resolve(appDirectory, 'src/views')

const copyFilePath = path.join(viewPath, filePath)
const baseName = path.basename(copyFilePath)
const componentName = baseName.replace(/(^\w|-\w)/g, letter => letter.slice(-1).toUpperCase())

// 模板文件位置
const ownPath = fs.realpathSync(__dirname)
const tplPath = path.join(ownPath, '..', 'template-page')
const tplJsPath = path.join(tplPath, 'page.js')
const tplCssPath = path.join(tplPath, 'page.less')

// 复制文件
function copyFile(srcFile, distFile, data) {
    ejs.renderFile(srcFile, data, (err, str) => {
        if (!err) {
            fs.ensureFileSync(distFile)
            fs.writeFileSync(distFile, str)
        }
    })
}

// 复制js文件
copyFile(tplJsPath, copyFilePath + '.jsx', { componentName })
// 复制less文件
fs.copySync(tplCssPath, copyFilePath + '.less')
