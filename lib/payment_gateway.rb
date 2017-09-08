# Represents the Payment Gateway APIs in the system
class PaymentGateway
  def initialize(params)
    @params = params
  end

  def charge
    Stripe::Charge.create(
      amount: @params[:amount],
      currency: @params[:currency],
      customer: @params[:customer_id],
      description: @params[:description]
    )
  end

  def create_customer
    Stripe::Customer.create(
      email: @params[:email],
      card: @params[:stripe_card_token_id]
    )
  end

  def retrieve_customer
    Stripe::Customer.retrieve(@params[:stripe_customer_id])
  end
end
