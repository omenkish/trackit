class Entry < ApplicationRecord
  belongs_to :user

  enum entry_type: {
    clock_in: 0,
    clock_out: 1,
  }

  validates :entry_type, presence: true, inclusion: entry_types.keys

  validates :user_id, presence: true
  validates :time, presence: true
end
