class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: :create

  def create
    user = User.new(user_params)
    if user.create_with_stripe_charge
      render json: { user: user }
    else
      render json: { error: user.errors }, status: :unauthorized
    end
  end

  def show
    user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(
      :name, :email, :stripe_customer_id, :deleted,
      :password, :password_confirmation)
  end
end
