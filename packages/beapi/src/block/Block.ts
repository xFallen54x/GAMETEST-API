import type { Client, Dimension, Location } from '..'
import { BlockType, Permutation } from './'
import type { Block as IBlock, Dimension as IDimension, BlockInventoryComponent } from 'mojang-minecraft'

export class Block {
  protected readonly _client: Client
  protected readonly _IBlock: IBlock

  public constructor(client: Client, IBlock: IBlock) {
    this._client = client
    this._IBlock = IBlock
  }

  public getIBlock(): IBlock {
    return this._IBlock
  }

  public getId(): string {
    return this._IBlock.id
  }

  public getType(): BlockType {
    return new BlockType(this._client, this._IBlock.type)
  }

  public setType(type: BlockType): void {
    this._IBlock.setType(type.getIBlockType())
  }

  public getPermutation(): Permutation {
    return new Permutation(this._client, this._IBlock.permutation)
  }

  public setPermutation(permutation: Permutation): void {
    this._IBlock.setPermutation(permutation.getIPermutation())
  }

  public getDimension(): IDimension {
    return this._IBlock.dimension
  }

  public getDimensionName(): Dimension {
    const id = this.getDimension().id.split(':')[1].replace(/_/g, ' ')

    return id as Dimension
  }

  public getLocation(): Location {
    const pos = this._IBlock.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y),
      z: Math.floor(pos.z),
    }
  }

  public isEmpty(): boolean {
    return this._IBlock.isEmpty
  }

  public isWaterLogged(): boolean {
    return this._IBlock.isWaterlogged
  }

  public getTags(): string[] {
    return this._IBlock.getTags()
  }

  public hasTag(tag: string): boolean {
    return this._IBlock.hasTag(tag)
  }

  // TODO: Make typings
  public getComponent(component: string): any {
    return this._IBlock.getComponent(component)
  }

  public getInventory(): BlockInventoryComponent {
    return this._IBlock.getComponent('inventory') as BlockInventoryComponent
  }
}
