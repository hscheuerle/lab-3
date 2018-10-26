const { spawn } = require('child_process')
const path = require('path')

// impl setImmediate for async

const wrapper = (payload, cb) => {
    const file = path.resolve('scripts', 'display-stats.py')
    const py = spawn('python', [file])

    let chunks = ""
    py.stdout.on('data', chunk => {
        chunks += chunk
    })
    py.stdout.on('end', () => {
        chunks = chunks.replace(/\'/g, '"')
        chunks = chunks.replace(/\(/g, '[')
        chunks = chunks.replace(/\)/g, ']')
        // chunks = chunks.replace(/^\{/g, '[')
        // chunks = chunks.replace('}', ']')
        cb(chunks)
    })

    py.stdin.write(payload)
    py.stdin.end()
}

module.exports = {
    wrapper: wrapper
}