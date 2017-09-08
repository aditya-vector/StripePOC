require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'POST #create' do
    it 'should create new user' do
      user_params = FactoryGirl.attributes_for(:user)
      post :create, user: user_params
      expect { post :create, user: user_params }.to change(User, :count).by(1)
    end
  end

  # describe 'GET #show' do
  #   it 'returns http success' do
  #     get :show
  #     expect(response).to have_http_status(:success)
  #   end
  # end
end
