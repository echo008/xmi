const execSync = require('child_process').execSync;

const args =  process.argv.slice(2)

// 生成文档
if (args.length === 0) {
    execSync('xmi-docgen')
} else {
    execSync(`xmi-docgen ${args.join(' ')}`)
}
