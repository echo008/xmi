#!/usr/bin/env node
const argv = require('commander')

function collect(val, memo) {
  memo.push(val)
  return memo
}

const defaultExtensions = ['js', 'jsx']
const defaultExclude = []
const defaultIgnore = ['node_modules', '__tests__', '__mocks__']

argv
  .usage('[path...] [options]')
  .description(
    'Extract meta information from React components.\n' +
      '  If a directory is passed, it is recursively traversed.'
  )
  .option('-o, --out <file>', 'Store extracted information in the FILE')
  .option(
    '-x, --extension <extension>',
    'File extensions to consider. Repeat to define multiple extensions. Default: ' +
      JSON.stringify(defaultExtensions),
    collect,
    ['js', 'jsx']
  )
  .option(
    '-e, --exclude <path>',
    'Filename or regex to exclude. Default: ' + JSON.stringify(defaultExclude),
    collect,
    []
  )
  .option(
    '-i, --ignore <path>',
    'Folders to ignore. Default: ' + JSON.stringify(defaultIgnore),
    collect,
    ['node_modules', '__tests__', '__mocks__']
  )
  .arguments('<path>')

argv.parse(process.argv)

const async = require('async')
const dir = require('node-dir')
const fs = require('fs')
const path = require('path')
const {
  writeError,
  writeResult,
  genCommentContent
} = require('../lib/main')

const outputName = argv.out || 'DOCUMENT.md' // 默认输出文件
const output = path.resolve(path.join(process.cwd(), outputName))
let paths = argv.args
paths = (paths && paths.length) ? paths : ['src'] // 默认src目录
const extensions = new RegExp('\\.(?:' + argv.extension.join('|') + ')$')
const ignoreDir = argv.ignore
let excludePatterns = argv.exclude

const regexRegex = /^\/(.*)\/([igymu]{0,5})$/
if (
  excludePatterns &&
  excludePatterns.length === 1 &&
  regexRegex.test(excludePatterns[0])
) {
  const match = excludePatterns[0].match(regexRegex)
  excludePatterns = new RegExp(match[1], match[2])
}

let documentText = '# 文档注释: \n\n'
let isGen = false

function traverseDir(filePath, done) {
  dir.readFiles(
    filePath,
    {
      match: extensions,
      exclude: excludePatterns,
      excludeDir: ignoreDir,
    },
    function(error, content, filename, next) {
      if (error) {
        throw error
      }
      try {
        const genContent = genCommentContent(content, filename)
        if (genContent) {
          documentText += genContent
          if(!isGen) isGen = true
        }
      } catch (genError) {
        writeError(genError, filename)
      } finally {
        next()
      }
    },
    function(error) {
      if (error) {
        throw error
      }
      done()
    }
  )
}

async.eachSeries(
  paths,
  function(filePath, done) {
    fs.stat(filePath, function(error, stats) {
      if (error) {
        writeError(error, filePath)
        done()
        return
      }
      if (stats.isDirectory()) {
        try {
          traverseDir(filePath, done)
        } catch (traverseError) {
          writeError(traverseError)
          done()
        }
      } else {
        try {
          const genContent = genCommentContent(fs.readFileSync(filePath, { encoding: 'utf-8' }), filePath)
          if (genContent) {
            documentText += genContent
            if(!isGen) isGen = true
          }
        } catch (genError) {
          writeError(genError, filePath)
        } finally {
          done()
        }
      }
    })
  },
  function() {
    if (isGen) writeResult(output ,documentText)
  }
)
