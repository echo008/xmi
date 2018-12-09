const fs = require('fs')
const chalk = require('chalk')
const extractComments = require('esprima-extract-comments')

// 输出错误信息
function writeError(msg, filePath) {
  if (filePath) {
    process.stderr.write(chalk.red('Error with path "' + filePath + '": '))
  }
  process.stderr.write(chalk.red(msg + '\n'))
  if (msg instanceof Error) {
    process.stderr.write(chalk.red(msg.stack + '\n'))
  }
}

// 输出结果
function writeResult(output, result) {
  if (output) {
    fs.writeFileSync(output, result)
  } else {
    process.stdout.write(result + '\n')
  }
}

// 生成注释信息
function genCommentContent(content, filename) {
  try {
    let documentText = ''
    let hasComment = false
    let document = '-----\n'
    document += `**${filename}**\n\n`
    const comments = extractComments(content)
    comments.forEach(({ type, value }) => {
        if (type === 'BlockComment') {
            const lines = value.split('\n')
            for (let i = 0, l = lines.length; i < l; i++) {
                lines[i] = lines[i].replace(/^\s*\*\s?/, '');
            }
            const comment = lines.join('\n').trim()
            if (comment.indexOf('__doc__') === 0) {
                if (!hasComment) hasComment = true
                document += comment.slice(7).trim()
                document += `\n\n`
            }
        }
    })
    if (hasComment) {
        documentText += document
        console.log(chalk.green(`${filename} 文档生成成功`))
        return documentText
    }
    return false
  } catch (genError) {
    throw genError
  }
}

module.exports = {
  writeError,
  writeResult,
  genCommentContent
}
