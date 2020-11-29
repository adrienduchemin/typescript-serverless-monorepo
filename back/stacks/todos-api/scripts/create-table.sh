aws dynamodb create-table \
    --table-name todos \
    --attribute-definitions AttributeName="todoId",AttributeType=S \
    --key-schema AttributeName="todoId",KeyType="HASH" \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://localhost:8000 \
