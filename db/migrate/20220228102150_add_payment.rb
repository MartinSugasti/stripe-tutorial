class AddPayment < ActiveRecord::Migration[6.0]
  def change
    create_table :payments do |t|
      t.string :email
      t.string :token
    end
  end
end
