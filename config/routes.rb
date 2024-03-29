Rails.application.routes.draw do
  root 'sessions#new'
  namespace :api do
    namespace :v1 do
      resources :users, path: '/register', only: [:create]
      resources :entries, only: [:index, :create, :update]
    end
  end
  controller :sessions do
    post   'login'  => :create
    delete 'logout' => :destroy
  end
  get '/*path' => 'sessions#new'
end
