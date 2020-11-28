import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations'

// @table('table_name')
@table('todos')
export class Todo {
  @hashKey()
  id!: string

  @rangeKey({ defaultProvider: () => new Date() })
  createdAt!: Date

  @attribute()
  name!: string

  @attribute()
  description?: string
}
