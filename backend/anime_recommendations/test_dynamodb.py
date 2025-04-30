import boto3
from botocore.exceptions import ClientError


def test_dynamodb_connection():
    try:
        # Create a DynamoDB client
        dynamodb = boto3.client("dynamodb")

        # List all tables in DynamoDB
        response = dynamodb.list_tables()

        # Print the table names
        print("DynamoDB Tables:")
        for table in response["TableNames"]:
            print(f"- {table}")

        print("\nConnection to DynamoDB successful!")
    except ClientError as e:
        print(f"Error connecting to DynamoDB: {e}")


if __name__ == "__main__":
    test_dynamodb_connection()
