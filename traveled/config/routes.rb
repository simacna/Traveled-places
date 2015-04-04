Rails.application.routes.draw do


  root 'home#index'
 
  get 'oauth' => 'users#oauth'

  get 'callback' => 'users#oauth_callback'

  get 'map' => 'welcome#index'

  resources :photos


 
end
