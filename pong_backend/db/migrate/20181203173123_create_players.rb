class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :name
      t.string :email
      t.string :username
      t.integer :games_won
      t.integer :games_lost

      t.timestamps
    end
  end
end
