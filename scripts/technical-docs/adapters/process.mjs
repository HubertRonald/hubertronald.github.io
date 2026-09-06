import { spawn } from 'node:child_process'

export function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env,
      stdio: options.stdio ?? 'inherit'
    })

    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(
        `${command} ${args.join(' ')} failed${signal ? ` with signal ${signal}` : ` with exit code ${code}`}`
      ))
    })
  })
}
