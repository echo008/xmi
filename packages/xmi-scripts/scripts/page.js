const path = require('path')
const ejs = require('ejs')
const fs = require('fs-extra')
const yParser = require('yargs-parser')
const chalk = require('chalk')


const args =  process.argv.slice(2)
/**
 * -s 上层父级路由path
 * -p 重新定义路由
 * -n 组件展示的name
 * -a 是否需要权限控制
 */
const argsParser = yParser(args)
// 目标相对文件位置
const filePath = args[0]

const appDirectory = fs.realpathSync(process.cwd())
const viewPath = path.resolve(appDirectory, 'src/views')


const copyFilePath = path.join(viewPath, argsParser.s || '', filePath)
const baseName = path.basename(copyFilePath)
const componentName = baseName.replace(/(^\w|-\w)/g, letter => letter.slice(-1).toUpperCase())

// 模板文件位置
const ownPath = fs.realpathSync(__dirname)

const tplPath = path.join(ownPath, '..', 'template-page')
const tplJsPath = path.join(tplPath, 'page.js')
const tplCssPath = path.join(tplPath, 'page.less')

// router文件位置
const routerPath = path.resolve(appDirectory, 'src/router/index.json')
const isRouterPath = fs.existsSync(routerPath)

// router配置文件不存在
if (!isRouterPath) {
    console.error(chalk.red(`router配置文件不存在`))
    process.exit(1)
}
const routerPkg = require(routerPath)

function insertRoute(routers, filePath, configArgs, flag = false) {
    for (let i = 0; i < routers.length; i++) {
        const { path, routes } = routers[i]
        if (path === configArgs.s) {
            let route = {}
            if (configArgs.r) {
                route = {
                    ...route,
                    path: `/${argsParser.p || filePath}`,
                    redirect: configArgs.r
                }
            } else {
                if (configArgs.n) route.name = configArgs.n
                route = {
                    ...route,
                    path: `/${argsParser.p || filePath}`,
                    component: `.${configArgs.s}/${filePath}`
                }
                if (configArgs.hasOwnProperty('a')) route.authorized = true
            }
    
            if (routes) {
                routes.push(route)
            } else {
                routers[i].routes = [route]
            }
            flag = true
        } else {
            if (routes) {
                flag = insertRoute(routes, filePath, configArgs, flag)
            }
        }
    }
    return flag
}

let addRouterStatus = true
if (!argsParser.s) {
    routerPkg.push({
        path: `/${argsParser.p || filePath}`,
        component: `./${filePath}`
    })
} else {
    addRouterStatus = insertRoute(routerPkg, filePath, argsParser)
}

// 没发现匹配的上级路由
if (!addRouterStatus) {
    console.error(chalk.red(`未找到匹配的上级路由`))
    process.exit(1)
}

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

fs.writeFileSync(routerPath, JSON.stringify(routerPkg, null, 2))

