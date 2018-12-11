const execSync = require('child_process').execSync;

const args =  process.argv.slice(2)

// 生成文档
if (args.length === 0) {
    process.stdout.write(execSync('xmi-docgen'))
} else {
    process.stdout.write(execSync(`xmi-docgen ${args.join(' ')}`))
}
