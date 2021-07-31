
user = User.create(username: 'johnny', password: '123456')

if user
  [0, 1].each do |type|
    Entry.create!(
      user_id: user.id,
      time: Time.now,
      entry_type: type,
    )
  end

  puts '1 user with 2 entries seeded successfully!'
end
