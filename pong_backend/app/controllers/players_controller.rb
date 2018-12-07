class PlayersController < ApplicationController

  def index

    @players = Player.all
    render json: @players
  end

  def singleplayerinfo
    @player = Player.find(params[:id])
    render json: @player
  end

  def updateScore

    @player = Player.find(params[:id])
    # byebug
    @player.update(games_won_params)
    render json: @player

  end

  def create
    @player = Player.create(player_params)
    render json: @player
  end


  def show
    email = log_in_params[:email] + ".com"
    @player = Player.find_by(email: email, username: log_in_params[:username])

    render json: @player
  end

  def update
    @player = Player.find(params[:id])
    @player.update(player_params)
    render json: @player
  end

  private

  def games_won_params
    params.require(:player).permit(:games_won, :games_lost)
  end

  def player_id_params
    params.permit(:id)
  end

  def player_params
    params.require(:player).permit(:username, :name, :email)
  end

  def log_in_params
    params.permit(:username, :email)
  end
end
