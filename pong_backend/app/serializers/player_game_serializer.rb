class PlayerGameSerializer < ActiveModel::Serializer
  attributes :id, :player_id, :game_id
  belongs_to :player
  belongs_to :game
end
