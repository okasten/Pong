class GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games
  end
  
  def create
    @game = Game.create(games_params)
    render json: @game
  end

  def new
  end

  def edit
  end

  def show
  end

  def destroy
  end

  private
  def games_params
    params.require(:game).permit(:ballspeed, :points_to_win, :p1_score, :p2_score, :winner)
  end
end
