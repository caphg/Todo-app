class Item < ActiveRecord::Base
  belongs_to :user

  validates :user_id, presence: true
  validates :name, presence: true, length: {minimum: 3, maximum: 15}
  validates :due_date, presence: true
  validates :description, presence: true, length: {minimum: 3, maximum: 25}
  validates :priority, numericality: { greater_than: 0, less_than: 11 }

end
