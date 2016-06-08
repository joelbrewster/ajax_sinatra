require 'sinatra'
require 'sinatra/reloader'
require 'active_record'

# NOTES
# GET /notes
# POST /notes
# PATCH /post/:id
# DELETE /post/:id

# Define a connection
# Define our model(s)
# Define database/ table structure

get '/' do
  erb :index
end

get '/notes' do
  @notes = Note.all
  return @notes.to_json
end

post '/notes' do

end

patch '/note/:id' do

end

delete '/note/:id' do

end

