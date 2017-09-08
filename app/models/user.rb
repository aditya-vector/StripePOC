# Represents user in a system
class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, email: true
  validates :name, presence: true
  validates :deleted, inclusion: { in: [true, false] }
  validates :stripe_customer_id, presence: true


  def create_with_stripe_charge

  end
end
