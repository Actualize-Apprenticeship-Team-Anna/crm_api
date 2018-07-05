require 'twilio-ruby'

account_sid = "ACf998ee2a2bc146b000ee0580d35cccbf" # Your Account SID from www.twilio.com/console
auth_token = "141718c5d5d143154432a15df3b4e82d"   # Your Auth Token from www.twilio.com/console

@client = Twilio::REST::Client.new account_sid, auth_token
message = @client.messages.create(
    body: "Hello from Ruby",
    to: "+12088215380",    # Replace with your phone number
    from: "+16089608640")  # Replace with your Twilio number

puts message.sid