class UsersController < ApplicationController

	def oauth_callback
		insta_code = params["code"]
		binding.pry

	end
end
