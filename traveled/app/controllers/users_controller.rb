class UsersController < ApplicationController 

  def oauth
    redirect_to Instagram.authorize_url(:redirect_uri => "http://localhost:3000/callback")
  end

  def oauth_callback

    response = Instagram.get_access_token(params[:code], :redirect_uri => "http://localhost:3000/callback")
    session[:access_token] = response.access_token

    redirect_to root_path
  end
end