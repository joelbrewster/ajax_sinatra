require 'sinatra'
require 'sinatra/reloader'
require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: 'postgresql',
  database: 'notes_development'
)

class Note < ActiveRecord::Base

end

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
  content_type :json
  @notes = Note.all
  return @notes.to_json
end

post '/notes' do
  #receive params with text & category
  content_type :json
  note = Note.create(params)
  return note.to_json

end

patch '/note/:id' do

end

delete '/note/:id' do
  Note.find(params[:id]).destroy
  # Note.destroy(params[:id])
  204
end

