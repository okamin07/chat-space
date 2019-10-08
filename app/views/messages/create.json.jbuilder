json.image  @message.image.url
json.content  @message.content
json.user  @message.user.name
json.time  @message.created_at.strftime("%Y-%m-%d %H:%M")
