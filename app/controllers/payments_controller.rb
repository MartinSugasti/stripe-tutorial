class PaymentsController < ApplicationController
  def new
    @payment = Payment.new
  end

  def create
    @payment = Payment.new({
      email: params[:payment]["email"],
      token: params[:payment]["token"]
    })

    begin
      @payment.process_payment
      @payment.save
      flash[:success] = "Payment approved"
    rescue Exception => e
      flash[:error] = e.message
    end

    redirect_to new_payment_path
  end
end
