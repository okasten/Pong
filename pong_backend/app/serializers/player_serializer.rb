class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :games_won, :games_lost
  has_many :player_games
  has_many :games, through: :player_games
end
