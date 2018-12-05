class Player < ApplicationRecord
  has_many :player_games, dependent: :destroy
  has_many :games, through: :player_games
end
