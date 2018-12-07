Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # get '/pong_frontend', to: '#players'
  # resources :player do
  #   resources :game
  # end
  get '/players/:username/:email', to: 'players#show'
  post '/games', to: 'games#create'
  get '/games/:id', to: 'games#show'
  get '/games', to: 'games#index'
  resources :players, only: [:index, :update, :create, :destroy]


end
