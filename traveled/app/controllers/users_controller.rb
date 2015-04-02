
class UsersController < ApplicationController

	# This will redirect to get 'callback' => 'users#oauth_callback'
  def oauth
    redirect_to Instagram.authorize_url(:redirect_uri => "http://localhost:3000/callback")
  end

  def oauth_callback
  	#This is the second-call back providing us with access_token
    response = Instagram.get_access_token(params[:code], :redirect_uri => "http://localhost:3000/callback")
    session[:access_token] = response.access_token

	  # binding.pry
	redirect_to '/map'
  end

end
