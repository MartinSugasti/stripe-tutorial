Rails.application.routes.draw do
  root "payments#new"

  resources :payments, only: %i[new create]
end
