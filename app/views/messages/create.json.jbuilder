json.(@message, :body, :image)
json.date @message.created_at
json.name @message.user.name
json.id @message.id