class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.datetime :due_date
      t.integer :priority
      t.boolean :done
      t.string :description

      t.timestamps
    end
  end
end
