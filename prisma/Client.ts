import { PrismaClient } from '@prisma/client'

class PrismaManager {
  private client: PrismaClient | null
  private isConnected: boolean
  private isDisconnecting: boolean

  constructor() {
    this.client = null
    this.isConnected = false
    this.isDisconnecting = false
  }

  public getClient(): PrismaClient {
    if (!this.client) {
      this.client = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      })

      process.on('beforeExit', async () => {
        console.log('Process beforeExit hook - performing cleanup')
      
        try {
          // your cleanup logic here, e.g. disconnect Prisma
          await this.disconnect()
        } catch (error) {
          console.error('Error during beforeExit cleanup:', error)
        }
      })

      this.isConnected = true
    }

    return this.client
  }

  public async disconnect(): Promise<void> {
    if (this.client && this.isConnected && !this.isDisconnecting) {
      this.isDisconnecting = true

      try {
        console.log('Disconnecting Prisma client...')
        await this.client.$disconnect()
        console.log('Prisma client disconnected successfully')

        this.isConnected = false
        this.client = null
      } catch (error) {
        console.error('Error disconnecting Prisma client:', error)
        throw error
      } finally {
        this.isDisconnecting = false
      }
    }
  }

  public async healthCheck(): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false
    }

    try {
      await this.client.$queryRawUnsafe('SELECT 1') // use $queryRawUnsafe with raw SQL
      return true
    } catch (error) {
      console.error('Prisma health check failed:', error)
      return false
    }
  }
}

// Export singleton instance
const prismaManager = new PrismaManager()

export const prisma = prismaManager.getClient()
export { prismaManager }

export const gracefulShutdown = async (): Promise<void> => {
  await prismaManager.disconnect()
}
