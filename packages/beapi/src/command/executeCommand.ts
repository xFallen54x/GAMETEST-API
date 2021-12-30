import { world } from 'mojang-minecraft'
import type { ExecuteCommandResponse, Dimensions } from '../@types/BeAPI.i'

function executeCommand(cmd: string, dimension?: Dimensions, debug = false): ExecuteCommandResponse {
  const command = cmd.replace(/\\/g, '')

  try {
    if (!dimension) dimension = 'overworld'
    const cmd = world.getDimension(dimension).runCommand(command)

    return {
      statusMessage: cmd.statusMessage,
      data: cmd,
      err: false,
    }
  } catch (err) {
    if (!debug)
      return {
        statusMessage: `Error Occured: ${err}`,
        err: true,
      }
    console.warn(`[BeAPI] [executeCommand]${err}`)

    return {
      statusMessage: 'Error Occured',
      err: true,
    }
  }
}

export { executeCommand }