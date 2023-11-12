import requests

# Set the endpoint URL
url = 'http://localhost:8000/api/products/comment/'

# Set the access token obtained during the authentication process
access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5Nzk5MDkzLCJpYXQiOjE2OTk3ODgyOTMsImp0aSI6Ijk2ZTlmMzg4ZjI3YTQyNjhiYjRjN2ZmYWEyOWI5NzIzIiwidXNlcm5hbWUiOiJ1c2VyMTMiLCJlbWFpbCI6ImhleW8xM0BnbWFpbC5jb20ifQ.N4YZGGReY9UuXvLz1gIUgce2Ww93wJqFQ6EFcdJ-eXoDy_PMysrqmbO-Q'

# Set the product ID and comment data
product_id = 1 # Replace with the actual product ID
comment_data = {'comment': 'Your comment here', 'product': product_id}

# Set the headers with the Authorization header containing the access token
headers = {
    'Authorization': f'JWT {access_token}',
    'Content-Type': 'application/json',
}

# Make a POST request with the comment data
response = requests.post(url, json=comment_data, headers=headers)

# Print the response
print(response.status_code)
print(response.json())