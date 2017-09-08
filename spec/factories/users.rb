FactoryGirl.define do
  factory :user, aliases: [:support_user] do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password '123456'
    password_confirmation '123456'
    stripe_customer_id Faker::Crypto.md5
    deleted false
  end
end
