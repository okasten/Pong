class PlayerGameSerializer < ActiveModel::Serializer
  attributes :id, :p1_id, :p2_id, :game_id
  belongs_to :player
  belongs_to :game
end
