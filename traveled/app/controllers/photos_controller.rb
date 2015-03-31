class PhotosController < ApplicationController

	def index

		client = Instagram.client(:access_token => session[:access_token])
		# user = client.user
	 	#html = "<h1>#{user.username}'s recent media</h1>"

	 	photos = []

	    for media_item in client.user_recent_media
	      photo = {}
	      photo[:image_url] = media_item.images.thumbnail.url
	      photo[:latitude] = media_item.location.latitude
	      photo[:longitude] = media_item.location.longitude

		  photos << photo
	    end

	    respond_to do |format|

			format.json {render json: photos}
		end


	end

	



end
