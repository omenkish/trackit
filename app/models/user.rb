class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, confirmation: true

  has_secure_password

  before_save :downcase_username

  has_many :entries
  private

  def downcase_username
    self.username = username.downcase
  end
end
