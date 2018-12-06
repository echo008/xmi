const execSync = require('child_process').execSync;

const args =  process.argv.slice(2)

// 生成文档
if (args.length === 0) {
    execSync('react-doc-generator src -o DOCUMENTATION.md')
} else {
    execSync(`react-doc-generator ${args.join(' ')}`)
}
