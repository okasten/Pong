Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # get '/pong_frontend', to: '#players'
  # resources :player do
  #   resources :game
  # end
  get '/players/:username/:email', to: 'players#show'
  get '/players/:id', to: 'players#singleplayerinfo'
  patch '/players/:id', to: 'players#updateScore'
  post '/games', to: 'games#create'
  get '/games/:id', to: 'games#show'
  get '/games', to: 'games#index'
  get '/player_games', to: 'player_games#index'
  post '/player_games', to: 'player_games#create'
  resources :players, only: [:index, :update, :create, :destroy]
  resources :player_games, only: [:new, :destroy]

end
