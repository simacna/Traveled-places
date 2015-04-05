class PhotosController < ApplicationController

	def index

		client = Instagram.client(:access_token => session[:access_token])
		# user = client.user
		# page_1 = client.user_media_feed(777)
		# page_2_max_id = page_1.pagination.next_max_id
		# page_2 = client.user_recent_media(777, :max_id => page_2_max_id) 

	 	photos = []

	 	# for media_item in page_1.user_recent_media
	  #     photo = {}
	  #     photo[:image_url] = media_item.images.thumbnail.url
	  #     photo[:latitude] = media_item.location.latitude
	  #     photo[:longitude] = media_item.location.longitude

		 #  photos << photo

	  #   end
	  #   for media_item in page_2.user_recent_media
	  #     photo = {}
	  #     photo[:image_url] = media_item.images.thumbnail.url
	  #     photo[:latitude] = media_item.location.latitude
	  #     photo[:longitude] = media_item.location.longitude

		 #  photos << photo

	  #   end

	  # pseudo code:

	  # find out what client.user_recent_media(777), specifically 777 is

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
		# binding.pry

	end


end
