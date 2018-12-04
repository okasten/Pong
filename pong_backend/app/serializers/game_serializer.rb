class GameSerializer < ActiveModel::Serializer
  attributes :id, :ballspeed, :points_to_win, :p1_score, :p2_score, :winner
  has_many :player_games
  has_many :players, through: :player_games
end
