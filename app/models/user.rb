class User < ApplicationRecord
  #== Validations
  validates :username, presence: true, uniqueness: true
end
