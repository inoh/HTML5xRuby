Pusher::Application.routes.draw do
  resources :websocket, :only => [:index, :create]

  root :to => 'websocket#index'
end
