class PlayerGamesController < ApplicationController
  def index
    @player_games = PlayerGame.all
    render json: @player_games
  end

  def create
    @player_game = PlayerGame.create(game_params)

    render json: @player_game
  end

  private
  def game_params
    params.require(:player_game).permit(:game_id, :player_id)
  end
end
