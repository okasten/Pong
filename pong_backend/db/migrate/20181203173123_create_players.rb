class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :name
      t.string :email
      t.string :username
      t.integer :games_won, default: 0
      t.integer :games_lost, default: 0

      t.timestamps
    end
  end
end
